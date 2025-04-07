import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ApiService } from '../feature/API/api.service';
import { ProgressSpinnerService } from '../progress-spiner/progress-spinner.service';
import { IMine, IResponse } from '../feature/API/api.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public constructor(
    private apiService: ApiService,
    private progressSpinnerService: ProgressSpinnerService,
    private notificationService: NotificationService
  ) {}

  public validateToken(): Observable<boolean> {
    this.progressSpinnerService.onProgressSpiner();

    return this.apiService.get<IMine>(`${this.apiService.rootUrl}/validate`).pipe(
      map((response: IResponse<IMine>) => {
        this.progressSpinnerService.offProgressSpiner();
        return response.data.message === 'Токен валидный'; // Если токен валиден, сервер вернет 200
      }),
      catchError((error: HttpErrorResponse) => {
        this.progressSpinnerService.offProgressSpiner();
        this.notificationService.red(error?.error?.data?.message ? error?.error?.data?.message : 'Ошибка запроса валидации', 60);
        
        return of(false);
      })
    );
  }}
