
export type Role = 'user' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface Service {
  id: number;
  name: string;
  price_cents: number;
  duration_min: number;
}

export interface Appointment {
  id: number;
  user_id: number;
  service_id: number;
  date: string;
  time: string;
  status: 'booked' | 'done' | 'canceled';
  price_cents: number;
  client_name?: string;
  client_email?: string;
  service?: string;
}

export interface RevenueData {
  total_brl: string;
  count: number;
}
