import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Province } from '../models/provinceModels';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvincesService {

  private baseURL = environment.apiBaseUrl;
  private baseEndPoint = environment.provincesEndPoint;

  constructor(private httpClient: HttpClient) {}

  getProvinces(): Observable<Province[]> {
    return this.httpClient.get<Province[]>(`${this.baseURL}/${this.baseEndPoint}`);
  }
}
