import { AlertType, Package, User } from "../types/types";
import { CITY_DB } from "../config/data";

export const isToday = (iso?: string) => {
  if (!iso) return false;
  const a = new Date(iso).toLocaleDateString("sv-SE");
  const b = new Date().toLocaleDateString("sv-SE");
  return a === b;
};
export function formatDateTime(iso: string, locale = "en-GB") {
  return new Date(iso).toLocaleString(locale);
}
export const isTemperatureOutOfRange = (type: AlertType, t: number) => {
  if (type === "Fridge") return t > 8; // > 8°C
  if (type === "Freezer") return t > -15; // warmer than -15°C
  if (type === "Groceries") return t > 25; // > 25°C
  return false;
};

export function getLastByDate<T extends { date: string }>(arr: T[]): T | null {
  if (!arr?.length) return null;
  return arr.reduce((acc, s) =>
    new Date(s.date) > new Date(acc.date) ? s : acc
  );
}

export function packageBelongsToUser(pkg: Package, me: User & { id: number }) {
  switch (me.role) {
    case "Customer":
      return pkg.CustomerId?.id === me.id;
    case "Sender":
      return pkg.senderId?.id === me.id;
    case "Carrier":
      return pkg.carrierId?.id === me.id;
    case "Admin":
      return true;
    default:
      return false;
  }
}

export function getKpis(pkgs: Package[]) {
  const inTransit = pkgs.filter(
    (p) => p.status === "preparing" || p.status === "Shipped"
  ).length;
  const deliveredToday = pkgs.filter(
    (p) => p.status === "Delivered" && isToday(p.daterecieved)
  ).length;
  return { inTransit, deliveredToday, totalShipments: pkgs.length };
}

/** Latest reading across a set of packages (returns both package and reading). */
export function getLatestReadingAcross(pkgs: Package[]) {
  const pairs = pkgs
    .map((p) => ({ pkg: p, last: getLastByDate(p.stats) }))
    .filter((x) => x.last);

  if (!pairs.length) return null;

  return pairs.reduce((acc, cur) =>
    new Date(cur.last!.date) > new Date(acc.last!.date) ? cur : acc
  );
}
const sq = (a: number, b: number) => (a - b) * (a - b);

export function findNearestCityName(lat: number, lon: number) {
  let best = CITY_DB[0],
    bestD = Infinity;
  for (const c of CITY_DB) {
    const d = sq(lat, c.lat) + sq(lon, c.lon);
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }
  return best.name;
}

export function buildCityHistory(pkg: Package) {
  const sorted = [...pkg.stats].sort(
    (a, b) => +new Date(a.date) - +new Date(b.date)
  );
  const out: { city: string; date: string }[] = [];
  let prev = "";
  for (const s of sorted) {
    const city = findNearestCityName(s.gps.lat, s.gps.lon);
    if (city !== prev) {
      out.push({ city, date: s.date });
      prev = city;
    }
  }
  return out;
}
