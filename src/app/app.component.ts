import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressSpinnerService } from './progress-spiner/progress-spinner.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificationService } from './notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public isShowProgressSpiner: BehaviorSubject<boolean> = this.progressSpinnerService.isShowProgressSpiner;
  notifications: string[] = [];
  private notificationSubscription!: Subscription;
  
  public constructor (
    private router: Router,
    private progressSpinnerService: ProgressSpinnerService,
    private notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.router.navigate(['/auth'], {
      replaceUrl: true
    });
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }

  closeNotification(index: number): void {
    this.notifications.splice(index, 1);
  }

  trackByFn(index: number, item: any): any {
    return index;
  }
}
