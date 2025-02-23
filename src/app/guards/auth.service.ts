import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ApiService } from '../feature/API/api.service';
import { ProgressSpinnerService } from '../progress-spiner/progress-spinner.service';
import { IMine, IResponse } from '../feature/API/api.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public constructor(
    private apiService: ApiService,
    private progressSpinnerService: ProgressSpinnerService
  ) {}

  public validateToken(): Observable<boolean> {
    this.progressSpinnerService.onProgressSpiner();

    return this.apiService.get<IMine>(`${this.apiService.rootUrl}/validate`).pipe(
      map((response: IResponse<IMine>) => {
        return response.data.message === 'Токен валидный'; // Если токен валиден, сервер вернет 200
      }),
      tap(() => this.progressSpinnerService.offProgressSpiner())
    );
  }}
