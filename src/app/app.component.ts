import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressSpinnerService } from './progress-spiner/progress-spinner.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public isShowProgressSpiner: BehaviorSubject<boolean> = this.progressSpinnerService.isShowProgressSpiner;
  public notifications: string[] = [];
  private notificationSubscription!: Subscription;
  
  public constructor (
    private router: Router,
    private progressSpinnerService: ProgressSpinnerService
  ) {}

  public ngOnInit(): void {
    this.router.navigate(['/auth'], {
      replaceUrl: true
    });
  }

  public ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }

  public closeNotification(index: number): void {
    this.notifications.splice(index, 1);
  }

  public trackByFn(index: number): number {
    return index;
  }
}
