# frontend-app


Figma: https://www.figma.com/design/HMsVksOyA6S3ZsBGdZn303/Figma-Chas-Project?node-id=0-1&p=f&t=IdNb4XZDM0XbYpMO-0
TL;DR – Global state + API-lager (mock → riktigt API)

Målet: en enkel, förutsägbar arkitektur där UI bara pratar med ett ställe (ApiContext).
Under utveckling kör vi alltid mockad data (in-memory) men vi kan byta till riktiga endpoints utan att röra UI.

Arkitektur i en mening

React Query hämtar/skriv­er (mock-API), Redux Toolkit (EntityAdapter) håller normaliserat globalt state, och ApiContext exponerar alla queries + mutationer som en samlad hook för UI.

UI (Screens/Components)
   ⤷ useApiContext()
       ⤷ use*ApiCtx (users/companies/packages)
           ⤷ React Query (list/create/update/patch/delete)
               ⤷ Mock-API (in-memory av config/db)
           ⤷ onSuccess ⇒ dispatch till Redux slices (normaliserat)

Mappar & viktiga filer
app/
  api/                 # API-funktioner (mock nu, riktiga sen)
    companies.ts
    packages.ts
    users.ts
  config/
    data.ts            # "db" – mock-källa
  hooks/context/
    ApiContext.tsx     # Provider + useApiContext()
    api/
      useApiCtx.ts     # Aggregator – slår ihop alla domänhooks
      useCompaniesApiCtx.ts
      usePackagesApiCtx.ts
      useUsersApiCtx.ts
  store/
    store.ts           # Redux store
    companiesSlice.ts  # createEntityAdapter + reducers/selectors
    packagesSlice.ts
    usersSlice.ts
  types/
    types.ts           # Domän-typer (User, Company, Package, ...)

Mock-API (in-memory) – alltid på i dev

Läser initialt från config/data.ts och kopierar in i ett mem-objekt.

CRUD-funktioner uppdaterar mem och returnerar Promise (med delay()).

Exempel (förenklat):

// api/packages.ts
export async function listPackages() { return mem.packages; }
export async function createPackage(payload) { /* push till mem */ }
export async function updatePackageStatus(id, status) { /* mutate mem */ }
export async function addSensorValue(id, value) { /* append mem.stats */ }
export async function deletePackage(id) { /* filter mem */ }


När du byter till riktiga endpoints: kommentera in http.get/post/patch i samma filer.

Domän-hooks (per resurs)

Varje use*ApiCtx.ts gör tre saker:

Query (React Query v5) → hämtar listan

useEffect på success → dispatch(setAllX(...)) till Redux

Mutationer → uppdaterar Redux + QueryCache i onSuccess

Exempel (companies, förkortat):

const companiesQuery = useQuery<Company[]>({ queryKey: ["companies"], queryFn: api.listCompanies });

useEffect(() => {
  if (companiesQuery.isSuccess && companiesQuery.data) {
    dispatch(setAllCompanies(companiesQuery.data));
  }
}, [companiesQuery.isSuccess, companiesQuery.data, dispatch]);

const createCompanyMutation = useMutation({ /* api.createCompany */ });
const updateCompanyMutation = useMutation({ /* api.updateCompany */ });
const deleteCompanyMutation = useMutation({ /* api.deleteCompany */ });

ApiContext – en enda ingång för UI

Aggregatorn useApiCtx() slår ihop alla domänhooks och räknar fram en global isLoading.
Provider:

export function ApiProvider({ children }: PropsWithChildren) {
  const value = useApiCtx();
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}


I App.tsx:

<Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <ApiProvider>
      <AppNavigator />
    </ApiProvider>
  </QueryClientProvider>
</Provider>

Redux slices – normaliserat state

createEntityAdapter per resurs (companies/users/packages).

Konsekventa action-namn: setAllCompanies, addOneCompany, updateOneCompany, removeOneCompany, …

Selectors per slice (getSelectors<RootState>(s => s.companies)).

Fördelar:

O(1) uppslag med id, enkel merge av serverrespons, snabb rendering.

Så använder UI detta (exempel)
import { useApiContext } from "../../hooks/context/ApiContext";

export default function CompaniesScreen() {
  const {
    companiesQuery,
    createCompanyMutation,
    updateCompanyMutation,
    deleteCompanyMutation,
  } = useApiContext();

  if (companiesQuery.isLoading) return <Spinner />;

  const first = companiesQuery.data?.[0];
  return (
    <>
      <Text>Antal: {companiesQuery.data?.length ?? 0}</Text>
      <Button title="Create" onPress={() => createCompanyMutation.mutate({ name: "Ny", date: new Date().toISOString() })}/>
      <Button title="Rename first" disabled={!first} onPress={() => first && updateCompanyMutation.mutate({ id: first.id, name: first.name + " *" })}/>
      <Button title="Delete first" disabled={!first} onPress={() => first && deleteCompanyMutation.mutate({ id: first.id })}/>
    </>
  );
}


Vill du läsa från Redux i stället för direkt från queryn? Använd slice-selectors. Båda funkar – välj konsekvent per skärm.

Byta till riktiga endpoints (senare)

Byt ut innehållet i api/*.ts (mock) till http.get/post/patch/delete.

Behåll samma funktionssignaturer → UI orört.

Om servern paginerar/filtrerar: justera queryKey (t.ex. ["packages", page]) och om du vill normalisera i Redux på samma sätt.

Namngivning & DX

Inga förkortningar: createCompanyMutation hellre än create.

companiesQuery (inte bara companies) = React Query-objektet (har data, isFetching, refetch).

Tydliga typer överallt – inga any.

Varför detta upplägg?

Testbart & utbyggbart: mock-API nu, riktiga endpoints sen – UI orörda.

Klar separation: datahämtning (React Query) ⟷ globalt UI-vänligt state (Redux).

Enkel konsumtion: skärmar importerar bara useApiContext() och får allt de behöver.
