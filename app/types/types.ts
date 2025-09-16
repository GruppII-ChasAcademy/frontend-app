export type Role = "Admin" | "Sender" | "Carrier" | "Customer";

export type User = {
  id?: number;
  name: string;
  password: string;
  epost: string;
  phone: number;
  role: Role;
  image: string;
  company: Company;
  date: string;
  packages?: Package[];
};
export type CompanyAdress = {
  id: number;
  adress: string;
  city: string;
  postnumber: number;
  notes: string;
};

export type Company = {
  id: number;
  name: string;
  location?: CompanyAdress[];
  date: string;
};

export type DeliveryStatus = "preparing" | "Shipped" | "Delivered";
export type Package = {
  id: number;
  title?: string;
  CustomerId: User;
  senderId: User;
  carrierId: User;
  status: DeliveryStatus;
  dateorder: string;
  datesend: string;
  daterecieved: string;
  stats: SensorValue[];
  notes?: string;
};
export type AlertType = "Fridge" | "Freezer" | "Groceries";

export type GeoPoint = {
  lat: number;
  lon: number;
};
export type SensorValue = {
  id: number;
  temperature: number;
  gps: GeoPoint;
  huminity: string;
  Alert: AlertType;
  date: string;
};
