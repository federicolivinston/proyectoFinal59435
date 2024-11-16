import { Injectable } from '@angular/core';
import { Student, StudentDetail } from '../models/studentModels';
import { concatMap, delay, forkJoin, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Province } from '../models/provinceModels';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private baseURL = environment.apiBaseUrl;
  private baseEndPoint = environment.studentsEndPoint;
  private provinceEndPoint = environment.provincesEndPoint;
  private inscriptionsEndPoint = environment.inscriptionsEndPoint;

  constructor(private httpClient: HttpClient) {}
  
  getStudents(): Observable<StudentDetail[]> {
    return forkJoin({
      students: this.httpClient.get<Student[]>(`${this.baseURL}/${this.baseEndPoint}`),
      provinces: this.httpClient.get<Province[]>(`${this.baseURL}/${this.provinceEndPoint}`)
    }).pipe(
      map(({ students, provinces }) => {
        return students.map(student => ({
          ...student,
          province: provinces.find(p => p.id === student.idProvince)?.name || ''
        }));
      })
    );
  }

  getStudentById(id: string): Observable<StudentDetail | null> {
    const students = this.httpClient.get<Student>(`${this.baseURL}/${this.baseEndPoint}/${id}`);
    const provinces = this.httpClient.get<Province[]>(`${this.baseURL}/${this.provinceEndPoint}`);

    return forkJoin({ student: students, provinces: provinces }).pipe(
      map(({ student, provinces }) => ({
        ...student,
        province: provinces.find(p => p.id === student.idProvince)?.name || ''
      }))
    );
  }

  createStudent(data: Omit<Student, 'id'>): Observable<Student> {
    return this.httpClient.post<Student>(`${this.baseURL}/${this.baseEndPoint}`, {
      ...data,
      createdAt: new Date().toISOString(),
    });
  }

  removeStudentById(id: string): Observable<StudentDetail[]> {
    return this.httpClient
      .delete<Student>(`${this.baseURL}/${this.baseEndPoint}/${id}`)
      .pipe(concatMap(() => this.getStudents()));
  }

  updateStudentById(id: string, update: Partial<Student>) {
    return this.httpClient
      .patch<Student>(`${this.baseURL}/${this.baseEndPoint}/${id}`, update)
      .pipe(concatMap(() => this.getStudents()));
  }
}
