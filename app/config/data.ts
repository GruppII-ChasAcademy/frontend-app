// app/mocks/data.ts
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
} from '../types/types'

// ---------- Adresser (5 st) ----------
export const CompanyAdresses: CompanyAdress[] = [
    { id: 1, adress: 'Storgatan 1', city: 'Stockholm', postnumber: 11122, notes: 'HQ' },
    { id: 2, adress: 'Avenyn 12', city: 'Göteborg', postnumber: 41136, notes: 'Region Väst' },
    { id: 3, adress: 'Västra Esplanaden 7', city: 'Umeå', postnumber: 90326, notes: 'Region Norr' },
    { id: 4, adress: 'Södra Förstadsg. 4', city: 'Malmö', postnumber: 21143, notes: 'Region Syd' },
    { id: 5, adress: 'Drottninggatan 25', city: 'Uppsala', postnumber: 75310, notes: 'Distribution' },
]

// ---------- Företag (5 st) ----------
export const Companies: Company[] = [
    { id: 1, name: 'SCA', location: [CompanyAdresses[0], CompanyAdresses[2]], date: '2025-09-01' },
    { id: 2, name: 'Volvo AB', location: [CompanyAdresses[1]], date: '2025-09-02' },
    { id: 3, name: 'IKEA', location: [CompanyAdresses[4]], date: '2025-09-03' },
    { id: 4, name: 'Spotify', location: [CompanyAdresses[0], CompanyAdresses[3]], date: '2025-09-04' },
    { id: 5, name: 'Klarna', location: [CompanyAdresses[1]], date: '2025-09-05' },
]

// ---------- Användare (5 st) ----------
export const users: User[] = [
    {
        id: 1,
        name: 'Alice Andersson',
        password: 'secret',
        epost: 'alice@sca.example',
        phone: 46701112233,
        role: 'Admin',
        image: 'https://picsum.photos/seed/alice/200',
        company: Companies[0],
        date: '2025-09-06',
        packages: [],
    },
    {
        id: 2,
        name: 'Sven Sender',
        password: 'secret',
        epost: 'sven@volvo.example',
        phone: 46702223344,
        role: 'Sender',
        image: 'https://picsum.photos/seed/sven/200',
        company: Companies[1], // Volvo
        date: '2025-09-06',
        packages: [],
    },
    {
        id: 3,
        name: 'Karin Carrier',
        password: 'secret',
        epost: 'karin@ikea.example',
        phone: 46703334455,
        role: 'Carrier',
        image: 'https://picsum.photos/seed/karin/200',
        company: Companies[2], // IKEA
        date: '2025-09-07',
        packages: [],
    },
    {
        id: 4,
        name: 'Carl Customer',
        password: 'secret',
        epost: 'carl@spotify.example',
        phone: 46704445566,
        role: 'Customer',
        image: 'https://picsum.photos/seed/carl/200',
        company: Companies[3], // Spotify
        date: '2025-09-07',
        packages: [],
    },
    {
        id: 5,
        name: 'Eva Customer',
        password: 'secret',
        epost: 'eva@klarna.example',
        phone: 46705556677,
        role: 'Customer',
        image: 'https://picsum.photos/seed/eva/200',
        company: Companies[4], // Klarna
        date: '2025-09-08',
        packages: [],
    },
]

// ---------- Hjälp: skapa sensorrader ----------
const gp = (lat: number, lon: number): GeoPoint => ({ lat, lon })
const SV = (
    id: number,
    temperature: number,
    gps: GeoPoint,
    huminity: string,
    Alert: AlertType,
    date: string
): SensorValue => ({ id, temperature, gps, huminity, Alert, date })

// ---------- Packages (5 st), varje med 5 st SensorValue ----------
export const packages: Package[] = [
    {
        id: 1,
        title: 'Kylvaror – Uppsala',
        CustomerId: users[4], // Eva
        senderId: users[1],   // Sven (Sender)
        carrierId: users[2],  // Karin (Carrier)
        status: 'preparing',
        dateorder: '2025-09-08T08:15:00Z',
        datesend: '2025-09-08T10:00:00Z',
        daterecieved: '2025-09-09T13:30:00Z',
        notes: 'Kräver kylkedja',
        stats: [
            SV(1, 4.2, gp(59.3293, 18.0686), '78%', 'Fridge', '2025-09-08T10:00:00Z'),
            SV(2, 4.5, gp(59.40, 17.95), '77%', 'Fridge', '2025-09-08T11:00:00Z'),
            SV(3, 5.0, gp(59.55, 17.85), '76%', 'Fridge', '2025-09-08T12:00:00Z'),
            SV(4, 5.3, gp(59.70, 17.75), '75%', 'Fridge', '2025-09-08T13:00:00Z'),
            SV(5, 4.8, gp(59.8586, 17.6389), '75%', 'Fridge', '2025-09-08T14:00:00Z'),
        ],
    },
    {
        id: 2,
        title: 'Frysvaror – Malmö',
        CustomerId: users[3], // Carl
        senderId: users[1],   // Sven (Sender)
        carrierId: users[2],  // Karin (Carrier)
        status: 'Shipped',
        dateorder: '2025-09-07T09:00:00Z',
        datesend: '2025-09-07T12:30:00Z',
        daterecieved: '2025-09-08T09:15:00Z',
        notes: 'Håll -18°C',
        stats: [
            SV(6, -17.2, gp(57.7089, 11.9746), '68%', 'Freezer', '2025-09-07T12:30:00Z'),
            SV(7, -18.0, gp(56.90, 12.50), '67%', 'Freezer', '2025-09-07T14:00:00Z'),
            SV(8, -18.3, gp(56.30, 12.95), '66%', 'Freezer', '2025-09-07T15:30:00Z'),
            SV(9, -17.8, gp(55.95, 13.10), '66%', 'Freezer', '2025-09-07T17:00:00Z'),
            SV(10, -18.1, gp(55.6050, 13.0038), '65%', 'Freezer', '2025-09-07T18:30:00Z'),
        ],
    },
    {
        id: 3,
        title: 'Grönsakslåda – Göteborg',
        CustomerId: users[3], // Carl
        senderId: users[0],   // Alice (Admin som avsändare i test)
        carrierId: users[2],  // Karin
        status: 'Delivered',
        dateorder: '2025-09-05T08:00:00Z',
        datesend: '2025-09-05T10:00:00Z',
        daterecieved: '2025-09-05T16:45:00Z',
        notes: 'Ömtåligt',
        stats: [
            SV(11, 6.1, gp(59.3293, 18.0686), '70%', 'Groceries', '2025-09-05T10:00:00Z'),
            SV(12, 7.0, gp(58.40, 17.30), '69%', 'Groceries', '2025-09-05T12:00:00Z'),
            SV(13, 7.3, gp(57.90, 16.40), '68%', 'Groceries', '2025-09-05T13:30:00Z'),
            SV(14, 6.8, gp(57.40, 15.80), '67%', 'Groceries', '2025-09-05T15:00:00Z'),
            SV(15, 6.5, gp(57.7089, 11.9746), '67%', 'Groceries', '2025-09-05T16:30:00Z'),
        ],
    },
    {
        id: 4,
        title: 'Elektronik – Umeå',
        CustomerId: users[4], // Eva
        senderId: users[1],   // Sven
        carrierId: users[2],  // Karin
        status: 'Shipped',
        dateorder: '2025-09-09T07:30:00Z',
        datesend: '2025-09-09T09:00:00Z',
        daterecieved: '2025-09-10T14:10:00Z',
        notes: 'Fuktkänsligt',
        stats: [
            SV(16, 15.2, gp(59.3293, 18.0686), '55%', 'Groceries', '2025-09-09T09:00:00Z'),
            SV(17, 14.9, gp(60.10, 17.40), '54%', 'Groceries', '2025-09-09T11:00:00Z'),
            SV(18, 14.0, gp(61.00, 16.10), '53%', 'Groceries', '2025-09-09T13:00:00Z'),
            SV(19, 13.5, gp(62.30, 17.00), '52%', 'Groceries', '2025-09-09T15:00:00Z'),
            SV(20, 13.0, gp(63.8258, 20.2630), '52%', 'Groceries', '2025-09-09T17:00:00Z'),
        ],
    },
    {
        id: 5,
        title: 'Färskvaror – Klarna',
        CustomerId: users[4], // Eva
        senderId: users[1],   // Sven
        carrierId: users[2],  // Karin
        status: 'preparing',
        dateorder: '2025-09-10T07:45:00Z',
        datesend: '2025-09-10T10:15:00Z',
        daterecieved: '2025-09-11T12:20:00Z',
        notes: 'Får ej överstiga 8°C',
        stats: [
            SV(21, 5.8, gp(59.3293, 18.0686), '72%', 'Fridge', '2025-09-10T10:15:00Z'),
            SV(22, 6.1, gp(59.60, 18.10), '71%', 'Fridge', '2025-09-10T11:45:00Z'),
            SV(23, 6.5, gp(59.80, 18.30), '70%', 'Fridge', '2025-09-10T13:15:00Z'),
            SV(24, 7.2, gp(60.00, 18.50), '70%', 'Fridge', '2025-09-10T14:45:00Z'),
            SV(25, 6.7, gp(60.20, 18.70), '69%', 'Fridge', '2025-09-10T16:15:00Z'),
        ],
    },
]


export const db = {
    CompanyAdresses,
    Companies,
    users,
    packages,
}
