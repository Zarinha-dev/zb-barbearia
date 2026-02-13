
import { User, Appointment, Service } from '../types';

const USERS_KEY = 'zb_db_users';
const APPOINTMENTS_KEY = 'zb_db_appointments';

// Dados Iniciais de Administrador
const DEFAULT_ADMIN: User = {
  id: 0,
  name: 'ZB Master',
  email: 'admin@zb.com',
  role: 'admin'
};

export const db = {
  // USUÁRIOS
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [DEFAULT_ADMIN];
  },
  
  saveUser: (user: Omit<User, 'id'>) => {
    const users = db.getUsers();
    const newUser = { ...user, id: Date.now() };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    return newUser;
  },

  findUserByEmail: (email: string) => {
    return db.getUsers().find(u => u.email === email);
  },

  // AGENDAMENTOS
  getAppointments: (): Appointment[] => {
    const data = localStorage.getItem(APPOINTMENTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveAppointment: (app: Omit<Appointment, 'id'>) => {
    const apps = db.getAppointments();
    const newApp = { ...app, id: Date.now() };
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify([...apps, newApp]));
    return newApp;
  },

  updateAppointmentStatus: (id: number, status: Appointment['status']) => {
    const apps = db.getAppointments().map(a => 
      a.id === id ? { ...a, status } : a
    );
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(apps));
  }
};
