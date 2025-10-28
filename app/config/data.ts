import type {
  Role,
  User,
  Company,
  CompanyAdress,
  Package,
  SensorValue,
  GeoPoint,
  DeliveryStatus,
  AlertType,
  City,
} from "../types/types";

// ---------- Addresses (5) ----------
export const CompanyAdresses: CompanyAdress[] = [
  {
    id: 1,
    adress: "Storgatan 1",
    city: "Stockholm",
    postnumber: 11122,
    notes: "HQ",
  },
  {
    id: 2,
    adress: "Avenyn 12",
    city: "Gothenburg",
    postnumber: 41136,
    notes: "West Region",
  },
  {
    id: 3,
    adress: "Västra Esplanaden 7",
    city: "Umea",
    postnumber: 90326,
    notes: "North Region",
  },
  {
    id: 4,
    adress: "Södra Förstadsg. 4",
    city: "Malmo",
    postnumber: 21143,
    notes: "South Region",
  },
  {
    id: 5,
    adress: "Drottninggatan 25",
    city: "Uppsala",
    postnumber: 75310,
    notes: "Distribution",
  },
];

// ---------- Companies (5) ----------
export const Companies: Company[] = [
  {
    id: 1,
    name: "SCA",
    location: [CompanyAdresses[0], CompanyAdresses[2]],
    date: "2025-09-01",
  },
  {
    id: 2,
    name: "Volvo AB",
    location: [CompanyAdresses[1]],
    date: "2025-09-02",
  },
  { id: 3, name: "IKEA", location: [CompanyAdresses[4]], date: "2025-09-03" },
  {
    id: 4,
    name: "Spotify",
    location: [CompanyAdresses[0], CompanyAdresses[3]],
    date: "2025-09-04",
  },
  { id: 5, name: "Klarna", location: [CompanyAdresses[1]], date: "2025-09-05" },
];

// ---------- Users (5) ----------
export const users: User[] = [
  {
    id: 1,
    name: "Alice Andersson",
    password: "secret",
    epost: "alice@sca.example",
    phone: 46701112233,
    role: "Admin",
    image: "https://picsum.photos/seed/alice/200",
    company: Companies[0],
    date: "2025-09-06",
    packages: [],
  },
  {
    id: 2,
    name: "Sven Sender",
    password: "secret",
    epost: "sven@volvo.example",
    phone: 46702223344,
    role: "Sender",
    image: "https://picsum.photos/seed/sven/200",
    company: Companies[1],
    date: "2025-09-06",
    packages: [],
  },
  {
    id: 3,
    name: "Karin Carrier",
    password: "secret",
    epost: "karin@ikea.example",
    phone: 46703334455,
    role: "Carrier",
    image: "https://picsum.photos/seed/karin/200",
    company: Companies[2],
    date: "2025-09-07",
    packages: [],
  },
  {
    id: 4,
    name: "Carl Customer",
    password: "secret",
    epost: "carl@spotify.example",
    phone: 46704445566,
    role: "Customer",
    image: "https://picsum.photos/seed/carl/200",
    company: Companies[3],
    date: "2025-09-07",
    packages: [],
  },
  {
    id: 5,
    name: "Eva Customer",
    password: "secret",
    epost: "eva@klarna.example",
    phone: 46705556677,
    role: "Customer",
    image: "https://picsum.photos/seed/eva/200",
    company: Companies[4],
    date: "2025-09-08",
    packages: [],
  },
];

// ---------- Helpers ----------
const gp = (lat: number, lon: number): GeoPoint => ({ lat, lon });
const SV = (
  id: number,
  temperature: number,
  gps: GeoPoint,
  huminity: string,
  Alert: AlertType,
  date: string
): SensorValue => ({ id, temperature, gps, huminity, Alert, date });

// ---------- Packages (5) ----------
export const packages: Package[] = [
  {
    id: 1,
    title: "Chilled goods – Uppsala",
    CustomerId: users[4], // Eva
    senderId: users[1], // Sven
    carrierId: users[2], // Karin
    status: "preparing",
    dateorder: "2025-09-08T08:15:00Z",
    datesend: "2025-09-08T10:00:00Z",
    daterecieved: "2025-09-09T13:30:00Z",
    notes: "Requires cold chain",
    stats: [
      SV(1, 4.2, gp(59.3293, 18.0686), "78%", "Fridge", "2025-09-08T10:00:00Z"),
      SV(2, 4.5, gp(59.4, 17.95), "77%", "Fridge", "2025-09-08T11:00:00Z"),
      SV(3, 5.0, gp(59.55, 17.85), "76%", "Fridge", "2025-09-08T12:00:00Z"),
      SV(4, 5.3, gp(59.7, 17.75), "75%", "Fridge", "2025-09-08T13:00:00Z"),
      SV(5, 4.8, gp(59.8586, 17.6389), "75%", "Fridge", "2025-09-08T14:00:00Z"),
    ],
  },
  {
    id: 2,
    title: "Frozen goods – Malmo",
    CustomerId: users[3], // Carl
    senderId: users[1], // Sven
    carrierId: users[2], // Karin
    status: "Shipped",
    dateorder: "2025-09-07T09:00:00Z",
    datesend: "2025-09-07T12:30:00Z",
    daterecieved: "2025-09-08T09:15:00Z",
    notes: "Keep -18°C",
    stats: [
      SV(
        6,
        -17.2,
        gp(57.7089, 11.9746),
        "68%",
        "Freezer",
        "2025-09-07T12:30:00Z"
      ),
      SV(7, -18.0, gp(56.9, 12.5), "67%", "Freezer", "2025-09-07T14:00:00Z"),
      SV(8, -18.3, gp(56.3, 12.95), "66%", "Freezer", "2025-09-07T15:30:00Z"),
      SV(9, -17.8, gp(55.95, 13.1), "66%", "Freezer", "2025-09-07T17:00:00Z"),
      SV(
        10,
        -18.1,
        gp(55.605, 13.0038),
        "65%",
        "Freezer",
        "2025-09-07T18:30:00Z"
      ),
    ],
  },
  {
    id: 3,
    title: "Vegetable crate – Gothenburg",
    CustomerId: users[3], // Carl
    senderId: users[0], // Alice
    carrierId: users[2], // Karin
    status: "Delivered",
    dateorder: "2025-09-05T08:00:00Z",
    datesend: "2025-09-05T10:00:00Z",
    daterecieved: "2025-09-05T16:45:00Z",
    notes: "Fragile",
    stats: [
      SV(
        11,
        6.1,
        gp(59.3293, 18.0686),
        "70%",
        "Groceries",
        "2025-09-05T10:00:00Z"
      ),
      SV(12, 7.0, gp(58.4, 17.3), "69%", "Groceries", "2025-09-05T12:00:00Z"),
      SV(13, 7.3, gp(57.9, 16.4), "68%", "Groceries", "2025-09-05T13:30:00Z"),
      SV(14, 6.8, gp(57.4, 15.8), "67%", "Groceries", "2025-09-05T15:00:00Z"),
      SV(
        15,
        6.5,
        gp(57.7089, 11.9746),
        "67%",
        "Groceries",
        "2025-09-05T16:30:00Z"
      ),
    ],
  },
  {
    id: 4,
    title: "Electronics – Umea",
    CustomerId: users[4], // Eva
    senderId: users[1], // Sven
    carrierId: users[2], // Karin
    status: "Shipped",
    dateorder: "2025-09-09T07:30:00Z",
    datesend: "2025-09-09T09:00:00Z",
    daterecieved: "2025-09-10T14:10:00Z",
    notes: "Moisture-sensitive",
    stats: [
      SV(
        16,
        15.2,
        gp(59.3293, 18.0686),
        "55%",
        "Groceries",
        "2025-09-09T09:00:00Z"
      ),
      SV(17, 14.9, gp(60.1, 17.4), "54%", "Groceries", "2025-09-09T11:00:00Z"),
      SV(18, 14.0, gp(61.0, 16.1), "53%", "Groceries", "2025-09-09T13:00:00Z"),
      SV(19, 13.5, gp(62.3, 17.0), "52%", "Groceries", "2025-09-09T15:00:00Z"),
      SV(
        20,
        13.0,
        gp(63.8258, 20.263),
        "52%",
        "Groceries",
        "2025-09-09T17:00:00Z"
      ),
    ],
  },
  {
    id: 5,
    title: "Fresh goods – Klarna",
    CustomerId: users[4], // Eva
    senderId: users[1], // Sven
    carrierId: users[2], // Karin
    status: "preparing",
    dateorder: "2025-09-10T07:45:00Z",
    datesend: "2025-09-10T10:15:00Z",
    daterecieved: "2025-09-11T12:20:00Z",
    notes: "Must not exceed 8°C",
    stats: [
      SV(
        21,
        5.8,
        gp(59.3293, 18.0686),
        "72%",
        "Fridge",
        "2025-09-10T10:15:00Z"
      ),
      SV(22, 6.1, gp(59.6, 18.1), "71%", "Fridge", "2025-09-10T11:45:00Z"),
      SV(23, 6.5, gp(59.8, 18.3), "70%", "Fridge", "2025-09-10T13:15:00Z"),
      SV(24, 7.2, gp(60.0, 18.5), "70%", "Fridge", "2025-09-10T14:45:00Z"),
      SV(25, 6.7, gp(60.2, 18.7), "69%", "Fridge", "2025-09-10T16:15:00Z"),
      SV(26, 9.4, gp(60.25, 18.8), "69%", "Fridge", "2025-09-10T17:45:00Z"),
    ],
  },
];
export const CITY_DB: City[] = [
  { name: "Stockholm", lat: 59.3293, lon: 18.0686 },
  { name: "Gothenburg", lat: 57.7089, lon: 11.9746 },
  { name: "Malmo", lat: 55.605, lon: 13.0038 },
  { name: "Uppsala", lat: 59.8586, lon: 17.6389 },
  { name: "Vasteras", lat: 59.6111, lon: 16.5448 },
  { name: "Orebro", lat: 59.2741, lon: 15.2066 },
  { name: "Linkoping", lat: 58.4108, lon: 15.6214 },
  { name: "Norrkoping", lat: 58.5877, lon: 16.1924 },
  { name: "Jonkoping", lat: 57.7826, lon: 14.1618 },
  { name: "Helsingborg", lat: 56.0465, lon: 12.6945 },
  { name: "Lund", lat: 55.7047, lon: 13.191 },
  { name: "Umea", lat: 63.8258, lon: 20.263 },
  { name: "Lulea", lat: 65.5848, lon: 22.1547 },
  { name: "Ostersund", lat: 63.1792, lon: 14.6357 },
  { name: "Sundsvall", lat: 62.3908, lon: 17.3069 },
  { name: "Gavle", lat: 60.6749, lon: 17.1413 },
  { name: "Boras", lat: 57.721, lon: 12.9401 },
  { name: "Halmstad", lat: 56.6745, lon: 12.8568 },
  { name: "Kalmar", lat: 56.6634, lon: 16.3568 },
  { name: "Karlskrona", lat: 56.1616, lon: 15.5866 },
  { name: "Skovde", lat: 58.3912, lon: 13.8451 },
  { name: "Karlstad", lat: 59.4022, lon: 13.5115 },
  { name: "Vaxjo", lat: 56.8777, lon: 14.8091 },
  { name: "Kristianstad", lat: 56.0294, lon: 14.1567 },
  { name: "Trollhattan", lat: 58.2837, lon: 12.2886 },
  { name: "Uddevalla", lat: 58.3498, lon: 11.9424 },
  { name: "Falun", lat: 60.6036, lon: 15.6259 },
  { name: "Borlange", lat: 60.4858, lon: 15.4371 },
  { name: "Eskilstuna", lat: 59.3713, lon: 16.5097 },
  { name: "Sodertalje", lat: 59.1955, lon: 17.6253 },
  { name: "Nykoping", lat: 58.753, lon: 17.0079 },
  { name: "Visby", lat: 57.6348, lon: 18.2948 },
  { name: "Kiruna", lat: 67.8558, lon: 20.2253 },
];
export const db = {
  CompanyAdresses,
  Companies,
  users,
  packages,
};

export const addPackageFromScan = (data: string) => {
  try {
    const parsed = JSON.parse(data);

    const newPackage: Package = {
      id: db.packages.length + 1,
      title: parsed.title ?? `Scanned package: ${data}`,
      CustomerId: db.users.find(u => u.id === parsed.CustomerId) || db.users[4],
      senderId: db.users.find(u => u.id === parsed.senderId) || db.users[1],
      carrierId: db.users.find(u => u.id === parsed.carrierId) || db.users[2],
      status: parsed.status ?? "preparing",
      dateorder: new Date().toISOString(),
      datesend: new Date().toISOString(),
      daterecieved: new Date().toISOString(),
      notes: parsed.notes ?? "Generated from QR scan",
      stats: parsed.stats || [],
    };

    db.packages.unshift(newPackage);
    console.log("Added new package from QR:", newPackage);
  } catch (error) {
    console.error("Invalid QR data:", error);
  }
};
