import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Inscription } from '../models/inscriptionModels';
import { concatMap, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {
  private baseURL = environment.apiBaseUrl;
  private baseEndPoint = environment.inscriptionsEndPoint;

  constructor(private httpClient: HttpClient) {}

  getInscriptions(): Observable<Inscription[]> {
    return this.httpClient.get<Inscription[]>(`${this.baseURL}/${this.baseEndPoint}`);
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
