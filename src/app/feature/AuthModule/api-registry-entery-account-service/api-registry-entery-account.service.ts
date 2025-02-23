import { Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { ApiService } from '../../API/api.service';
import { ProgressSpinnerService } from 'src/app/progress-spiner/progress-spinner.service';
import { ILoginCreate, ILoginEntery, IMine, IResourceData, IResponse, IUser } from '../../API/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiRegistryEnteryAccountService {
  constructor(private apiService: ApiService, private progressSpinnerService: ProgressSpinnerService) { }

  public registryAccount(data: ILoginCreate): Observable<IResourceData> {
    const jsonUserInfo: string = JSON.stringify(data);
    this.progressSpinnerService.onProgressSpiner();

    return this.apiService.post<IUser>(`${this.apiService.rootUrl}/register`, jsonUserInfo).pipe(
      switchMap((responseUser: IResponse<IUser>) => {
        return this.apiService.get<IMine>(`${this.apiService.rootUrl}/mines/${responseUser.data.enterpriseId}`).pipe(
          map((response: IResponse<IMine>) => {
            return {user: responseUser.data, mine: response.data};
          }),
          tap(() => this.progressSpinnerService.offProgressSpiner()))
      })
    )
  }

  public entryAccount(data: ILoginEntery): Observable<IResourceData> {
    const jsonUserInfo: string = JSON.stringify(data);
    this.progressSpinnerService.onProgressSpiner();

    return this.apiService.post<IUser>(`${this.apiService.rootUrl}/entry`, jsonUserInfo).pipe(
      switchMap((responseUser: IResponse<IUser>) => {
        return this.apiService.get<IMine>(`${this.apiService.rootUrl}/mines/${responseUser.data.enterpriseId}`).pipe(
          map((response: IResponse<IMine>) => {
            return { user: responseUser.data, mine: response.data };
          }),
          tap(() => this.progressSpinnerService.offProgressSpiner()))
      })
    )
  }
}
