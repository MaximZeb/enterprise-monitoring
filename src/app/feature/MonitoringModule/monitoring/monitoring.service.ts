import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResourceData } from '../../API/api.interface';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  public userData: BehaviorSubject<IResourceData | null> = new BehaviorSubject<IResourceData | null>(null);

  public setUserData(data: IResourceData): void {
    this.userData.next(data);
  }

  public getUserData(): Observable<IResourceData | null> {
    return this.userData;
  }
}
