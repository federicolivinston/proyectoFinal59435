import { Person } from "./personModels";

export interface User extends Person{
    idUser: string;
    userName: string;
    password: string;
    profile: string;
    createdAt: Date;
  }