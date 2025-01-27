import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { ApiService } from '../../API/api.service';
import { ProgressSpinnerService } from 'src/app/progress-spiner/progress-spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRegistryEnteryAccountService {
  private readonly rootUrl: string = "http://localhost:3000";
  constructor(private apiService: ApiService, private progressSpinnerService: ProgressSpinnerService) { }

  public registryAccount(data: any): Observable<any> {
    const jsonUserInfo: string = JSON.stringify(data);
    this.progressSpinnerService.onProgressSpiner();

    return this.apiService.post(`${this.rootUrl}/register`, jsonUserInfo).pipe(
      switchMap((value: any) => {
        return this.apiService.get(`${this.rootUrl}/mines/${value.enterpriseId}`).pipe(tap(() => this.progressSpinnerService.offProgressSpiner()))
      })
    )
  }

  public entryAccount(data: any): Observable<any> {
    const jsonUserInfo: string = JSON.stringify(data);
    this.progressSpinnerService.onProgressSpiner();

    return this.apiService.post(`${this.rootUrl}/entry`, jsonUserInfo).pipe(
      switchMap((value: any) => {
        return this.apiService.get(`${this.rootUrl}/mines/${value.enterpriseId}`).pipe(tap(() => this.progressSpinnerService.offProgressSpiner()))
      })
    )
  }
}
