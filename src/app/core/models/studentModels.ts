import { Person } from "./personModels";

export interface Student extends Person{
    id: string;
    email: string;
    dni: number;
    street: string;
    idProvince: string;
    phone: string;
    createdAt: Date;
  }

export interface StudentDetail extends Student{
    province?: string;
    idInscription?:string;
  }