import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval, Subscription, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() message!: string;
  @Output() close = new EventEmitter<void>();

  private timerSubscription!: Subscription;
  private autoCloseDuration: number = 60000; // 60 seconds

  ngOnInit(): void {
    this.startAutoCloseTimer();
  }

  ngOnDestroy(): void {
    this.stopAutoCloseTimer();
  }

  closeNotification(): void {
    this.close.emit();
  }

  private startAutoCloseTimer(): void {
    this.timerSubscription = timer(this.autoCloseDuration).subscribe(() => { // Use timer
      this.closeNotification();
    });
  }

  private stopAutoCloseTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
