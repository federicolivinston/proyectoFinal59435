import { Injectable } from '@angular/core';
import { Course, Degree } from '../models/courseModels';
import { concatMap, delay, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Chair } from '../models/chairModels';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  
  private baseURL = environment.apiBaseUrl;
  private baseEndPoint = environment.coursesEndPoint;
  private degreeEndPoint = environment.degreesEndPoint;
  private chairEndPoint = environment.chairsEndPoint;

  constructor(private httpClient: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${this.baseURL}/${this.baseEndPoint}`);
  }

  getCourseById(id:string): Observable<Course | null> {
    return this.httpClient.get<Course>(`${this.baseURL}/${this.baseEndPoint}/${id}`).pipe(
      map((courses)=>{
        if (courses) {
          return courses;
        }else{
          return null;
        }
      })
    );
  }

  createCourse(data: Omit<Course, 'id'>): Observable<Course> {
    return this.httpClient.post<Course>(`${this.baseURL}/${this.baseEndPoint}`, {
      ...data,
      createdAt: new Date().toISOString(),
    });
  }

  removeCourseById(id: string): Observable<Course[]> {
    return this.httpClient
      .delete<Course>(`${this.baseURL}/${this.baseEndPoint}/${id}`)
      .pipe(concatMap(() => this.getCourses()));
  }

  updateCourseById(id: string, update: Partial<Course>) {
    return this.httpClient
      .patch<Course>(`${this.baseURL}/${this.baseEndPoint}/${id}`, update)
      .pipe(concatMap(() => this.getCourses()));
  }

  getDegrees(): Observable<Degree[]> {
    return this.httpClient.get<Degree[]>(`${this.baseURL}/${this.degreeEndPoint}`);
  }

  getChairsByIdCourse(id: string): Observable<Chair[]> {
    return this.httpClient.get<Chair[]>(`${this.baseURL}/${this.chairEndPoint}/?idCourse=${id}`);
  }

}
