import { Injectable } from '@angular/core';
import { Chair, ChairDetail } from '../models/chairModels';
import { concatMap, forkJoin, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/courseModels';
import { Inscription } from '../models/inscriptionModels';

@Injectable({
  providedIn: 'root'
})
export class ChairsService {

  private baseURL = environment.apiBaseUrl;
  private baseEndPoint = environment.chairsEndPoint;
  private courseEndPoint = environment.coursesEndPoint;
  private inscriptionsEndPoint = environment.inscriptionsEndPoint;

  constructor(private httpClient: HttpClient) {}

  getChairs(): Observable<ChairDetail[]>{
    return forkJoin({
      chairs: this.httpClient.get<Chair[]>(`${this.baseURL}/${this.baseEndPoint}`),
      courses: this.httpClient.get<Course[]>(`${this.baseURL}/${this.courseEndPoint}`)
    }).pipe(
      map(({ chairs, courses }) => {
        return chairs.map(chair => ({
          ...chair,
          course: courses.find(c => c.id === chair.idCourse)?.title || ''
        }));
      })
    );
  }

  getChairById(id: string): Observable<ChairDetail | null> {
    const chairs = this.httpClient.get<Chair>(`${this.baseURL}/${this.baseEndPoint}/${id}`);
    const courses = this.httpClient.get<Course[]>(`${this.baseURL}/${this.courseEndPoint}`);

    return forkJoin({ chair: chairs, courses: courses }).pipe(
      map(({ chair, courses }) => ({
        ...chair,
        course: courses.find(c => c.id === chair.idCourse)?.title || ''
      }))
    );
  }

  getChairsByIdStudent(id: string): Observable<ChairDetail []> {

    return forkJoin({
      inscriptions: this.httpClient.get<Inscription[]>(`${this.baseURL}/${this.inscriptionsEndPoint}/?idStudent=${id}`),
      chairs: this.httpClient.get<Chair[]>(`${this.baseURL}/${this.baseEndPoint}`),
      courses: this.httpClient.get<Course[]>(`${this.baseURL}/${this.courseEndPoint}`)
    }).pipe(
      map(({ inscriptions, chairs, courses }) => {
        return chairs
          .filter(chair => 
            inscriptions.some((inscription: Inscription) => inscription.idChair === chair.id)
          )
          .map(chair => {
            const inscription = inscriptions.find(insc => insc.idChair === chair.id);
            return {
              ...chair,
              course: courses.find(c => c.id === chair.idCourse)?.title || '',
              idInscription: inscription ? inscription.id : undefined 
            };
          })
          .filter(chair => chair.idInscription !== undefined); 
      })
    );
  }

  getChairsByIdCourse(id: string): Observable<Chair[]> {
    return this.httpClient.get<Chair[]>(`${this.baseURL}/${this.baseEndPoint}/?idCourse=${id}`);
  }

  createChair(data: Omit<Chair, 'id'>): Observable<Chair> {
    return this.httpClient.post<Chair>(`${this.baseURL}/${this.baseEndPoint}`, {
      ...data,
      createdAt: new Date().toISOString(),
    });
  }

  removeChairById(id: string): Observable<Chair[]> {
    return this.httpClient
      .delete<Chair>(`${this.baseURL}/${this.baseEndPoint}/${id}`)
      .pipe(concatMap(() => this.getChairs()));
  }

  updateChairById(id: string, update: Partial<Chair>) {
    return this.httpClient
      .patch<Chair>(`${this.baseURL}/${this.baseEndPoint}/${id}`, update)
      .pipe(concatMap(() => this.getChairs()));
  }
}
