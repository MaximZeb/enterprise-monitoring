import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IResponse } from './api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public post(url: string, date: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, date, {
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
