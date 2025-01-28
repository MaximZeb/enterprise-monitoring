import { Injectable } from '@angular/core';
import { ApiRegistryEnteryAccountService } from '../feature/AuthModule/api-registry-entery-account-service/api-registry-entery-account.service';
import { map, Observable, tap } from 'rxjs';
import { ApiService } from '../feature/API/api.service';
import { ProgressSpinnerService } from '../progress-spiner/progress-spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlRoot: string = this.apiRegistryEnteryAccountService.rootUrl; // Адрес проверки токена

  public constructor(
    private apiService: ApiService,
    private apiRegistryEnteryAccountService: ApiRegistryEnteryAccountService,
    private progressSpinnerService: ProgressSpinnerService
  ) {}

  public validateToken(): Observable<boolean> {
    this.progressSpinnerService.onProgressSpiner();

    return this.apiService.get(`${this.apiUrlRoot}/validate`).pipe(
      map((response) => {
        return response.status === 200; // Если токен валиден, сервер вернет 200
      }),
      tap(() => this.progressSpinnerService.offProgressSpiner())
    );
  }}
