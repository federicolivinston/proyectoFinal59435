import { Person } from "./personModels";

export interface User extends Person{
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    profile: string;
    createdAt: Date;
  }

export interface Profile {
  id: string,
  name: string
}