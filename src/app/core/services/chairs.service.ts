import { Injectable } from '@angular/core';
import { Chair } from '../models/chairModels';
import { delay, Observable, of } from 'rxjs';
import { generateRandomString } from '../../common/utils/utils';

let CHAIRS_DDBB: Chair[] = [
  {idChair: 'WRUJBZ', course: 'Oratoria', profesor:'Ernesto Sánchez', startDate: new Date(2024, 9, 23), vacants: 20, createdAt: new Date()},
  {idChair: 'GNFUVQ', course: 'Asistente Contable', profesor:'Julio Lopez', startDate: new Date(2024, 10, 1), vacants: 20, createdAt: new Date()},
  {idChair: 'PBXQEW', course: 'Excel', profesor:'Martin Suarez', startDate: new Date(2024, 9, 12), vacants: 20, createdAt: new Date()},
  {idChair: 'ENPYBP', course: 'Excel', profesor:'Ernesto Sánchez', startDate: new Date(2024, 10, 7), vacants: 20, createdAt: new Date()},
  {idChair: 'RJTCAE', course: 'Marketing de Contenidos', profesor:'Julio Vera', startDate: new Date(2024, 9, 15), vacants: 20, createdAt: new Date()},
];

@Injectable({
  providedIn: 'root'
})
export class ChairsService {

  constructor() { }

  getChairs(): Observable<Chair[]> {
    return of(CHAIRS_DDBB).pipe(delay(1000));
  }

  getChairById(id: string): Observable<Chair | null> {
    let chair = CHAIRS_DDBB.find((chair) => chair.idChair == id) || null;
    return of(chair).pipe(delay(1000));
  }

  createChair(data: Omit<Chair, 'idChair'>): Observable<Chair[]> {
    CHAIRS_DDBB.push({ ...data, idChair: generateRandomString(6) });
    return this.getChairs();
  }

  removeChairById(id: string): Observable<Chair[]> {
    CHAIRS_DDBB = CHAIRS_DDBB.filter((chair) => chair.idChair != id);
    return of(CHAIRS_DDBB).pipe(delay(1000));
  }

  updateChairById(id: string, update: Partial<Chair>) {
    CHAIRS_DDBB = CHAIRS_DDBB.map((chair) =>
      chair.idChair === id ? { ...chair, ...update } : chair
    );
    return of(CHAIRS_DDBB).pipe(delay(1000));
  }
}
