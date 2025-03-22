import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiDataTechnicsService } from '../api-data-technics/api-data-technics.service';
import { MonitoringService } from '../monitoring/monitoring.service';
import { Observable } from 'rxjs';
import { IAllIndications, ITechnicData } from '../../API/api.interface';
import { Dialog } from '@angular/cdk/dialog';
import { DialogChartComponent } from '../dialog-chart/dialog-chart.component';
import { mockIndictions } from './mock-real-time';
import { NotificationService } from 'src/app/notification/notification.service';
import { ProgressSpinnerService } from 'src/app/progress-spiner/progress-spinner.service';

@Component({
  selector: 'app-mine-technincs-head',
  templateUrl: './mine-technincs-head.component.html',
  styleUrls: ['./mine-technincs-head.component.scss']
})
export class MineTechnincsHeadComponent implements OnInit  {
  public allIndications: Observable<IAllIndications | null> = this.monitoringService.getAllIndications();
  public predictFact: null | { fact: number; } = null;
  public currentWorkShift: boolean = true;

  private intervalId: any;
  public technicsForm: FormGroup = new FormGroup({
      date: new FormControl('', Validators.required),
      workingShift: new FormControl('', Validators.required)
  });

  constructor(
    private apiDataTechnicsService: ApiDataTechnicsService,
    private monitoringService: MonitoringService,
    private dialog: Dialog,
    private notificationService: NotificationService,
    private progressSpinnerService: ProgressSpinnerService,
  ) {}

  public ngOnInit(): void {
    this.monitoringService.setAllIndications(_.cloneDeep(mockIndictions));
    this.buildChartCurrentWorkShift();
    this.apiDataTechnicsService.getPredictFact(+mockIndictions[3].indications_work_shift.plan).subscribe(v => this.predictFact = v.data)
  }

  public buildChartsTechincsSelectedDate(): void {
    if (this.technicsForm.valid) {
      this.progressSpinnerService.onProgressSpiner();
      this.currentWorkShift = !this.currentWorkShift;
      clearInterval(this.intervalId);
      this.apiDataTechnicsService.getWorkShiftDate(this.technicsForm.value).subscribe(() => setTimeout(() => this.progressSpinnerService.offProgressSpiner(), 1000))
    }
  }

  public openDialog(data: { data: ITechnicData, name: string}): void {
    this.dialog.open(DialogChartComponent, {
      width:  '800px',
      height: '800px',
      data: _.cloneDeep(data),
    });
  }

  public buildChartCurrentWorkShift(): void {
    if (this.currentWorkShift) {
      return;
    }

    this.progressSpinnerService.onProgressSpiner();
    this.intervalId = setInterval(() => this.monitoringService.setAllIndications(_.cloneDeep(mockIndictions)), 2000);
    this.currentWorkShift = !this.currentWorkShift;
    setTimeout(() => this.progressSpinnerService.offProgressSpiner(), 1000);
    // this.showYellowNotification();
    // this.showRedNotification();
  }

  public showYellowNotification(): void {
    this.notificationService.yellow('Yellow alert!');
  }

  public showRedNotification(): void {
    this.notificationService.red('Red error!');
  }
}

