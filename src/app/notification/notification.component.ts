import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService, NotificationData } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: NotificationData[] = [];
  private notificationSubscription: Subscription | undefined;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationSubscription = this.notificationService.notifications$.subscribe(
      (notification: NotificationData) => {
        this.addNotification(notification);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }

  addNotification(notification: NotificationData): void {
    this.notifications.push(notification);
    if (notification.timeout) {
      setTimeout(() => {
        this.closeNotification(notification);
      }, notification.timeout * 1000);
    }
  }

  closeNotification(notification: NotificationData): void {
    this.notifications = this.notifications.filter((n) => n !== notification);
  }

  getNotificationClass(type: 'yellow' | 'red'): string {
    switch (type) {
      case 'yellow':
        return 'notification-yellow';
      case 'red':
        return 'notification-red';
      default:
        return 'notification-yellow';
    }
  }
}