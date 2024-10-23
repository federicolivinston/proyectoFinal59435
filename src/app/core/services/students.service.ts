import { Injectable } from '@angular/core';
import { Student } from '../models/studentModels';
import { delay, Observable, of } from 'rxjs';
import { generateRandomString } from '../../common/utils/utils';

let STUDENTS_DDBB: Student[] = [
  {idStudent: 'WRUJBZ', firstName: 'Catalina', lastName:'Sánchez', email: 'catalinasanchez@hotmail.com', dni: 37019227, street: 'Paraguay 1850', province: 'Buenos Aires', phone: '1148 15 2936', createdAt: new Date()},
  {idStudent: 'GNFUVQ', firstName: 'Alejandro', lastName:'García', email: 'alejandrogarcía@hotmail.com', dni: 41168001,street: 'Republica De Italia 412', province: 'Mendoza', phone: '2614 30 8097', createdAt: new Date()},
  {idStudent: 'PBXQEW', firstName: 'Sofía', lastName:'Rodríguez', email: 'sofíarodriguez@hotmail.com', dni: 25230982,street: 'Casilla De Correo 127', province: 'Santa Fe', phone: '3436 42 2047', createdAt: new Date()},
  {idStudent: 'ENPYBP', firstName: 'Miguel', lastName:'López', email: 'miguellopez@hotmail.com', dni: 24270537,street: 'Lima 2118', province: 'Santa Fe', phone: '3414 32 2110', createdAt: new Date()},
  {idStudent: 'CNLEMX', firstName: 'Isabella', lastName:'González', email: 'isabellagonzález@hotmail.com', dni: 32166633,street: 'Monte Caseros 452', province: 'Buenos Aires', phone: '(0343) 431-7951', createdAt: new Date()},
  {idStudent: 'ZYLNFN', firstName: 'David', lastName:'Pérez', email: 'davidperez@hotmail.com', dni: 37685490,street: 'Entre Rios 461 Piso B Dpto 2', province: 'Buenos Aires', phone: '114659 9665', createdAt: new Date()},
  {idStudent: 'WAETFW', firstName: 'Valentina', lastName:'Martínez', email: 'valentinamartínez@hotmail.com', dni: 38545732,street: 'Belgrano 4736 Piso 1 Depto. A', province: 'Buenos Aires', phone: '1147 59 5542', createdAt: new Date()},
  {idStudent: 'RJTCAE', firstName: 'Diego', lastName:'Ramírez', email: 'diegoramirez@hotmail.com', dni: 46678544,street: '135 1684', province: 'Buenos Aires', phone: '2214 53 0990', createdAt: new Date()},
  {idStudent: 'MLJDSA', firstName: 'Emilia', lastName:'Torres', email: 'emiliatorres@hotmail.com', dni: 32800784,street: 'Avenida Pio Xii 1726', province: 'Corrientes', phone: '378342 6520', createdAt: new Date()},
  {idStudent: 'BLAAPQ', firstName: 'Mateo', lastName:'Hernandez', email: 'mateohernandez@hotmail.com', dni: 39912295,street: 'Av Belgrano 1152', province: 'Mendoza', phone: '3492 43 2180', createdAt: new Date()}
];

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }

  getStudents(): Observable<Student[]> {
    return of(STUDENTS_DDBB).pipe(delay(1000));
  }

  getStudentById(id: string): Observable<Student | null> {
    let student = STUDENTS_DDBB.find((student) => student.idStudent == id) || null;
    return of(student).pipe(delay(1000));
  }

  createStudent(data: Omit<Student, 'idStudent'>): Observable<Student[]> {
    STUDENTS_DDBB.push({ ...data, idStudent: generateRandomString(6) });
    return this.getStudents();
  }

  removeStudentById(id: string): Observable<Student[]> {
    STUDENTS_DDBB = STUDENTS_DDBB.filter((student) => student.idStudent != id);
    return of(STUDENTS_DDBB).pipe(delay(1000));
  }

  updateStudentById(id: string, update: Partial<Student>) {
    STUDENTS_DDBB = STUDENTS_DDBB.map((student) =>
      student.idStudent === id ? { ...student, ...update } : student
    );
    return of(STUDENTS_DDBB).pipe(delay(1000));
  }
}
