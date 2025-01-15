import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../API/api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRegistryEnteryAccountService {
  private readonly rootUrl: string = "http://localhost:3000";
  constructor(private apiService: ApiService) { }

  public registryAccount(data: any): Observable<any> {
    const jsonUserInfo: string = JSON.stringify(data);
    return this.apiService.post(`${this.rootUrl}/register`, jsonUserInfo);
  }
}
