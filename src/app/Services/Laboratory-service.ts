import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laboratoire } from '../models/laboratoire.model';


@Injectable({
  providedIn: 'root'
})
export class LaboratoireService {
  private apiUrl = 'http://localhost:8082/api/laboratories'; 

  constructor(private http: HttpClient) { }

  createLaboratoire(laboratoire: Omit<Laboratoire, 'id'>): Observable<Laboratoire> {
    return this.http.post<Laboratoire>(this.apiUrl, laboratoire);
  }

  

}
