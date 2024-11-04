import { Injectable } from '@angular/core';
import { Course } from '../models/courseModels';
import { concatMap, delay, map, Observable, of } from 'rxjs';
import { generateRandomString } from '../../common/utils/utils';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  
  private baseURL = environment.apiBaseUrl;
  private baseEndPoint = environment.coursesEndPoint;

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
}
