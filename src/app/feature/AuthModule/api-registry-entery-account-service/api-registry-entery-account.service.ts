import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { ApiService } from '../../API/api.service';
import { ProgressSpinnerService } from 'src/app/progress-spiner/progress-spinner.service';
import { ILoginCreate, ILoginEntery, IMine, IResourceData, IResponse, IUser } from '../../API/api.interface';
import { NotificationService } from 'src/app/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRegistryEnteryAccountService {
  constructor(
    private apiService: ApiService,
    private progressSpinnerService: ProgressSpinnerService,
    private notificationService: NotificationService
  ) { }

  public registryAccount(data: ILoginCreate): Observable<IResourceData | null> {
    const jsonUserInfo: string = JSON.stringify(data);
    this.progressSpinnerService.onProgressSpiner();

    return this.apiService.post<IUser>(`${this.apiService.rootUrl}/register`, jsonUserInfo).pipe(
      switchMap((responseUser: IResponse<IUser>) => {
        return this.getMine(responseUser);
      }),
      catchError((error: HttpErrorResponse) => {
        this.progressSpinnerService.offProgressSpiner();
        this.notificationService.red(error?.error?.data?.message ? error?.error?.data?.message : 'Ошибка запроса', 60);
        
        return of(null);
      })
    );
  }
  // TODO надо поправить обработать ошибку
  public entryAccount(data: ILoginEntery): Observable<IResourceData | null> {
    const jsonUserInfo: string = JSON.stringify(data);
    this.progressSpinnerService.onProgressSpiner();

    return this.apiService.post<IUser>(`${this.apiService.rootUrl}/entry`, jsonUserInfo).pipe(
      switchMap((responseUser: IResponse<IUser>) => {
        return this.getMine(responseUser);
      })
    )
  }

  private getMine(responseUser: IResponse<IUser>): Observable<null | IResourceData> {
    return this.apiService.get<IMine>(`${this.apiService.rootUrl}/mines/${responseUser.data.enterpriseId}`).pipe(
      map((response: IResponse<IMine>) => {
        return { user: responseUser.data, mine: response.data };
      }),
      tap(() => this.progressSpinnerService.offProgressSpiner()),
      catchError((error: HttpErrorResponse) => {
        this.progressSpinnerService.offProgressSpiner();
        this.notificationService.red(error?.error?.data?.message ? error?.error?.data?.message : 'Ошибка запроса', 60);

        return of(null);
      })
    );
  }
}
