import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface NotificationData {
  message: string;
  type: 'yellow' | 'red'; // Только два типа цвета
  timeout?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject = new Subject<NotificationData>();

  notifications$ = this.notificationsSubject.asObservable();

  show(message: string, type: 'yellow' | 'red' = 'yellow', timeout: number = 60): void {
    this.notificationsSubject.next({ message, type, timeout });
  }

  // Удобные методы
  yellow(message: string, timeout: number = 60): void {
    this.show(message, 'yellow', timeout);
  }

  red(message: string, timeout: number = 60): void {
    this.show(message, 'red', timeout);
  }
}