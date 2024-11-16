import { Chair } from "./chairModels";
import { Student } from "./studentModels";

export interface Inscription {
    id: string;
    idChair: string;
    idStudent: string;
    chair?: Chair;
    student?: Student;
  }

  export interface Option {
    id: string,
    Data: string,
  }