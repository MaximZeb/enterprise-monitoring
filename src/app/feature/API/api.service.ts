import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IResponse } from './api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public readonly rootUrl: string = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }

  public post<T>(url: string, date: string): Observable<IResponse<T>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<IResponse<T>>(url, date, {
      headers: headers,
      withCredentials: true
    });
  }

  public get<T>(url: string): Observable<IResponse<T>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<IResponse<T>>(url, {
      headers: headers,
      withCredentials: true
    });
  }
}
