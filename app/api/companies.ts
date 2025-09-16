import type { Company, CompanyAdress } from "../types/types";
import { db } from "../config/data";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Djupklona Company enligt din typ (location är valfri) */
const cloneCompany = (c: Company): Company => ({
  id: c.id,
  name: c.name,
  date: c.date,
  ...(c.location ? { location: c.location.map((a) => ({ ...a })) } : {}),
});

/** Muterbar in-memory-kopia, typad som Company[] */
let mem: { companies: Company[] } = {
  companies: db.Companies.map(cloneCompany),
};

const nextId = (arr: { id?: number }[]) =>
  (arr.length ? Math.max(...arr.map((x) => x.id ?? 0)) : 0) + 1;

// ===== READ =====
export async function listCompanies(): Promise<Company[]> {
  await delay(150);
  return mem.companies;
}

export async function getCompanyById(id: number): Promise<Company> {
  await delay(120);
  const c = mem.companies.find((x) => x.id === id);
  if (!c) throw new Error("Company not found");
  return c;
}

// ===== CREATE =====
export type CreateCompanyPayload = Omit<Company, "id">;

export async function createCompany(
  payload: CreateCompanyPayload
): Promise<Company> {
  await delay(180);
  const id = nextId(mem.companies);

  const company: Company = {
    id,
    name: payload.name,
    date: payload.date,
    ...(payload.location
      ? { location: payload.location.map((a: CompanyAdress) => ({ ...a })) }
      : {}),
  };

  mem.companies = [company, ...mem.companies];
  return company;
}

// ===== UPDATE (partial) =====
export type UpdateCompanyPayload = Partial<Company> & { id: number };

export async function updateCompany(
  patch: UpdateCompanyPayload
): Promise<Company> {
  await delay(180);
  const i = mem.companies.findIndex((x) => x.id === patch.id);
  if (i === -1) throw new Error("Company not found");

  const curr = mem.companies[i];

  // bygg nästa objekt och klona location om den skickas in
  const next: Company = {
    ...curr,
    ...(patch.name !== undefined ? { name: patch.name } : {}),
    ...(patch.date !== undefined ? { date: patch.date } : {}),
    ...(patch.location
      ? { location: patch.location.map((a: CompanyAdress) => ({ ...a })) }
      : {}),
  };

  mem.companies[i] = next;
  return next;
}

// ===== DELETE =====
export async function deleteCompany(id: number): Promise<void> {
  await delay(120);
  const before = mem.companies.length;
  mem.companies = mem.companies.filter((x) => x.id !== id);
  if (mem.companies.length === before) throw new Error("Company not found");
}
