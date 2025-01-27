import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRegistryEnteryAccountService } from '../feature/AuthModule/api-registry-entery-account-service/api-registry-entery-account.service';
import { map, Observable } from 'rxjs';
import { ApiService } from '../feature/API/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = this.apiRegistryEnteryAccountService.rootUrl; // Адрес проверки токена

  public constructor(
    private apiService: ApiService,
    private apiRegistryEnteryAccountService: ApiRegistryEnteryAccountService
  ) {}

  public validateToken(): Observable<boolean> {
    return this.apiService.get(`${this.apiUrl}/validate`).pipe(
      map((response) => {
        return response.status === 200; // Если токен валиден, сервер вернет 200
      })
    );
  }}
