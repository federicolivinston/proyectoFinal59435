import { Injectable } from '@angular/core';
import { Student } from '../models/studentModels';
import { delay, Observable, of } from 'rxjs';
import { generateRandomString } from '../../common/utils/utils';

let STUDENTS_DDBB: Student[] = [
  {idStudent: 'WRUJBZ', firstName: 'Catalina', lastName:'Sánchez', email: 'catalinasanchez@hotmail.com', dni: 37019227, createdAt: new Date()},
  {idStudent: 'GNFUVQ', firstName: 'Alejandro', lastName:'García', email: 'alejandrogarcía@hotmail.com', dni: 41168001, createdAt: new Date()},
  {idStudent: 'PBXQEW', firstName: 'Sofía', lastName:'Rodríguez', email: 'sofíarodriguez@hotmail.com', dni: 25230982, createdAt: new Date()},
  {idStudent: 'ENPYBP', firstName: 'Miguel', lastName:'López', email: 'miguellopez@hotmail.com', dni: 24270537, createdAt: new Date()},
  {idStudent: 'CNLEMX', firstName: 'Isabella', lastName:'González', email: 'isabellagonzález@hotmail.com', dni: 32166633, createdAt: new Date()},
  {idStudent: 'ZYLNFN', firstName: 'David', lastName:'Pérez', email: 'davidperez@hotmail.com', dni: 37685490, createdAt: new Date()},
  {idStudent: 'WAETFW', firstName: 'Valentina', lastName:'Martínez', email: 'valentinamartínez@hotmail.com', dni: 38545732, createdAt: new Date()},
  {idStudent: 'RJTCAE', firstName: 'Diego', lastName:'Ramírez', email: 'diegoramirez@hotmail.com', dni: 46678544, createdAt: new Date()},
  {idStudent: 'MLJDSA', firstName: 'Emilia', lastName:'Torres', email: 'emiliatorres@hotmail.com', dni: 32800784, createdAt: new Date()},
  {idStudent: 'BLAAPQ', firstName: 'Mateo', lastName:'Hernandez', email: 'mateohernandez@hotmail.com', dni: 39912295, createdAt: new Date()}
];

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }

  getStudents(): Observable<Student[]> {
    return of(STUDENTS_DDBB).pipe(delay(1000));
  }

  createStudent(data: Omit<Student, 'idStudent'>): Observable<Student[]> {
    STUDENTS_DDBB.push({ ...data, idStudent: generateRandomString(6) });
    return this.getStudents();
  }

  removeStudentById(id: string): Observable<Student[]> {
    STUDENTS_DDBB = STUDENTS_DDBB.filter((user) => user.idStudent != id);
    return of(STUDENTS_DDBB).pipe(delay(1000));
  }

  updateStudentById(id: string, update: Partial<Student>) {
    console.log(update);
    STUDENTS_DDBB = STUDENTS_DDBB.map((student) =>
      student.idStudent === id ? { ...student, ...update } : student
    );
    return of(STUDENTS_DDBB).pipe(delay(1000));
  }
}
