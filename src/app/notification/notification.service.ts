import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<string | string[]>();
  notification$ = this.notificationSubject.asObservable();

  showNotification(message: string | string[]): void {
    this.notificationSubject.next(message);
  }
}
