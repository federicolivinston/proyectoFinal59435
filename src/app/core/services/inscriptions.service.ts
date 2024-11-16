import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Inscription, Option } from '../models/inscriptionModels';
import { concatMap, forkJoin, map, Observable } from 'rxjs';
import { Student } from '../models/studentModels';
import { Chair, ChairDetail } from '../models/chairModels';
import { Course } from '../models/courseModels';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {
  private baseURL = environment.apiBaseUrl;
  private baseEndPoint = environment.inscriptionsEndPoint;
  private studentsEndPoint = environment.studentsEndPoint;
  private chairsEndPoint = environment.chairsEndPoint;
  private coursesEndPoint = environment.coursesEndPoint;

  constructor(private httpClient: HttpClient) {}

  getInscriptions(): Observable<Inscription[]> {
    return this.httpClient.get<Inscription[]>(`${this.baseURL}/${this.baseEndPoint}`);
  }

  getFormOptions(id:string, optionType: string): Observable<Option[]> {
    if (optionType == 'chair'){
      return forkJoin({
        inscriptions: this.httpClient.get<Inscription[]>(`${this.baseURL}/${this.baseEndPoint}/?idChair=${id}`),
        students: this.httpClient.get<Student[]>(`${this.baseURL}/${this.studentsEndPoint}`)
      }).pipe(
        map(({ inscriptions, students }) => {
          const studentIdsInChairs = inscriptions.map((inscription) => inscription.idStudent);
          const studentsNotInChairs = students.filter(student => !studentIdsInChairs.includes(student.id));
          return studentsNotInChairs.map((student) => ({
            id: student.id,
            Data: `${student.lastName} - ${student.firstName} - ${student.dni}`  
          }));
        })
      );
    }else{
      return forkJoin({
        inscriptions: this.httpClient.get<Inscription[]>(`${this.baseURL}/${this.baseEndPoint}/?idStudent=${id}`),
        chairs: this.httpClient.get<Chair[]>(`${this.baseURL}/${this.chairsEndPoint}`),
        courses: this.httpClient.get<Course[]>(`${this.baseURL}/${this.coursesEndPoint}`)
      }).pipe(
        map(({ inscriptions, chairs, courses }) => {
          const chairsIdsInStudent = inscriptions.map((inscription) => inscription.idChair);
          const chairsNotInStudents = chairs.filter(chair => !chairsIdsInStudent.includes(chair.id));
          return chairsNotInStudents.map((chair) => {
            const course = courses.find(c => c.id === chair.idCourse);
            const courseName = course ? course.title : 'Curso no encontrado';
            return {
              id: chair.id,
              Data: `${courseName} - ${chair.profesor} - ${chair.startDate}` 
            }  
          });
        })
      );
    }
    
  }

  getInscriptionsById(id: string, filterType: string): Observable<Inscription []> {
    if (filterType == 'chair'){
        return forkJoin({
          inscriptions: this.httpClient.get<Inscription[]>(`${this.baseURL}/${this.baseEndPoint}/?idChair=${id}`),
          students: this.httpClient.get<Student[]>(`${this.baseURL}/${this.studentsEndPoint}`)
        }).pipe(
          map(({ inscriptions, students }) => {
            return inscriptions.map(inscription => {
              const student = students.find(std => inscription.idStudent === std.id);
              return {
                ... inscription,
                student: student ? student : undefined 
              };
            }).filter(item => item.student !== undefined); 
          })
        );
    } else{
      return forkJoin({
        inscriptions: this.httpClient.get<Inscription[]>(`${this.baseURL}/${this.baseEndPoint}/?idStudent=${id}`),
        chairs: this.httpClient.get<ChairDetail[]>(`${this.baseURL}/${this.chairsEndPoint}`),
        courses: this.httpClient.get<Course[]>(`${this.baseURL}/${this.coursesEndPoint}`)
      }).pipe(
        map(({ inscriptions, chairs, courses }) => {
          return inscriptions.map(inscription => {
            const chair = chairs.find(std => inscription.idChair === std.id);
            if (chair) {
              chair.course = courses.find(c => c.id === chair.idCourse)?.title || '';
            }
            return {
              ... inscription,
              chair: chair ? chair : undefined 
            };
          }).filter(item => item.chair !== undefined); 
        })
      );
    } 
  }

  getInscriptionById(id:string): Observable<Inscription | null> {
    return this.httpClient.get<Inscription>(`${this.baseURL}/${this.baseEndPoint}/${id}`).pipe(
      map((inscriptions)=>{
        if (inscriptions) {
          return inscriptions;
        }else{
          return null;
        }
      })
    );
  }

  createInscription(idChair:string, idStudent:string): Observable<Inscription> {
    return this.httpClient.post<Inscription>(`${this.baseURL}/${this.baseEndPoint}`, {
      idChair: idChair,
      idStudent: idStudent

    });
  }

  removeInscriptionById(id: string): Observable<Inscription[]> {
    return this.httpClient
      .delete<Inscription>(`${this.baseURL}/${this.baseEndPoint}/${id}`)
      .pipe(concatMap(() => this.getInscriptions()));
  }
}
