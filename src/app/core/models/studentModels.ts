import { Person } from "./personModels";

export interface Student extends Person{
    idStudent: string;
    email: string;
    dni: number;
    createdAt: Date;
  }
  