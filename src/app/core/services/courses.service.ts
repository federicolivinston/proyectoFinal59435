import { Injectable } from '@angular/core';
import { Course } from '../models/courseModels';
import { delay, Observable, of } from 'rxjs';
import { generateRandomString } from '../../common/utils/utils';

let COURSES_DDBB: Course[] = [
  {idCourse: 'WRUJBZ', title: 'Oratoria', degree:'Universitario', createdAt: new Date()},
  {idCourse: 'KQVRDJ', title: 'Comunity Manager', degree:'Universitario', createdAt: new Date()},
  {idCourse: 'MDPTLR', title: 'Asistente Contable', degree:'Terciario', createdAt: new Date()},
  {idCourse: 'ATWDAG', title: 'Analista de RRHH', degree:'Universitario', createdAt: new Date()},
  {idCourse: 'USKTVL', title: 'Excel', degree:'Terciario', createdAt: new Date()},
  {idCourse: 'TVXKQU', title: 'Frances', degree:'Postgrado', createdAt: new Date()},
  {idCourse: 'LPQMXA', title: 'Marketing de Contenidos', degree:'Postgrado', createdAt: new Date()},
];

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getCourses(): Observable<Course[]> {
    return of(COURSES_DDBB).pipe(delay(1000));
  }

  getCourseById(id: string): Observable<Course | null> {
    let course = COURSES_DDBB.find((course) => course.idCourse == id) || null;
    return of(course).pipe(delay(1000));
  }

  createCourse(data: Omit<Course, 'idCourse'>): Observable<Course[]> {
    COURSES_DDBB.push({ ...data, idCourse: generateRandomString(6) });
    return this.getCourses();
  }

  removeCourseById(id: string): Observable<Course[]> {
    COURSES_DDBB = COURSES_DDBB.filter((course) => course.idCourse != id);
    return of(COURSES_DDBB).pipe(delay(1000));
  }

  updateCourseById(id: string, update: Partial<Course>) {
    COURSES_DDBB = COURSES_DDBB.map((course) =>
      course.idCourse === id ? { ...course, ...update } : course
    );
    return of(COURSES_DDBB).pipe(delay(1000));
  }
}
