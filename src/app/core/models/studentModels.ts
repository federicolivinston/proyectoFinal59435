import { Person } from "./personModels";

export interface Student extends Person{
    idStudent: string;
    email: string;
    dni: number;
    street: string;
    province: string;
    phone: string;
    createdAt: Date;
  }
  