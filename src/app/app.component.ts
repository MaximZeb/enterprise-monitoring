import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressSpinnerService } from './progress-spiner/progress-spinner.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isShowProgressSpiner: BehaviorSubject<boolean> = this.progressSpinnerService.isShowProgressSpiner;

  public constructor (
    private router: Router,
    private progressSpinnerService: ProgressSpinnerService,
  ) {}

  public ngOnInit(): void {
    this.router.navigate(['/auth']);
  }
}
