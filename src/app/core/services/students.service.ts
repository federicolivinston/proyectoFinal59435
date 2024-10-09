import { Injectable } from '@angular/core';
import { Student } from '../models/studentModels';
import { delay, Observable, of } from 'rxjs';

let STUDENTS_DDBB: Student[] = [
  {idStudent: 'gjatrg', firstName: 'manuel angel', lastName:'diez', email: 'manuel@hotmail.com', dni: 11949567, createdAt: new Date()},
  {idStudent: 'gjatrb', firstName: 'asuncion', lastName:'pino', email: 'asuncion@hotmail.com', dni: 11949567, createdAt: new Date()},
  {idStudent: 'gjatrc', firstName: 'manuel angel', lastName:'diez', email: 'manuel@hotmail.com', dni: 11949567, createdAt: new Date()},
  {idStudent: 'gjatrd', firstName: 'manuel angel', lastName:'diez', email: 'manuel@hotmail.com', dni: 11949567, createdAt: new Date()},
];

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }

  getStudents(): Observable<Student[]> {
    return new Observable((observer) => {
      // ACA HAY UN CAMBIO
      setInterval(() => {
        // observer.error('Error al cargar los datos');
        observer.next(STUDENTS_DDBB);
        observer.complete();
      }, 3000);
    });
  }

  removeStudentById(id: string): Observable<Student[]> {
    STUDENTS_DDBB = STUDENTS_DDBB.filter((user) => user.idStudent != id);
    return of(STUDENTS_DDBB).pipe(delay(1000));
  }

  updateStudentById(id: string, update: Partial<Student>) {
    STUDENTS_DDBB = STUDENTS_DDBB.map((student) =>
      student.idStudent === id ? { ...student, ...update } : student
    );

    return new Observable<Student[]>((observer) => {
      setInterval(() => {
        observer.next(STUDENTS_DDBB);
        observer.complete();
      }, 1000);
    });
  }

  /*addStudent(update: Partial<Student>) {
    STUDENTS_DDBB = STUDENTS_DDBB.filter((user) => user.dni != update.dni);

    STUDENTS_DDBB = STUDENTS_DDBB.map((student) =>
      student.idStudent === id ? { ...student, ...update } : student
    );

    return new Observable<Student[]>((observer) => {
      setInterval(() => {
        observer.next(STUDENTS_DDBB);
        observer.complete();
      }, 1000);
    });
  }*/
}
