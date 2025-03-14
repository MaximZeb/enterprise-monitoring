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

@Component({
  selector: 'app-mine-technincs-head',
  templateUrl: './mine-technincs-head.component.html',
  styleUrls: ['./mine-technincs-head.component.scss']
})
export class MineTechnincsHeadComponent implements OnInit  {
  public allIndications: Observable<IAllIndications | null> = this.monitoringService.getAllIndications();
  public predictFact: null | { fact: number; } = null;
  public technicsForm: FormGroup = new FormGroup({
      date: new FormControl('', Validators.required),
      workingShift: new FormControl('', Validators.required)
  });

  constructor(
    private apiDataTechnicsService: ApiDataTechnicsService,
    private monitoringService: MonitoringService,
    private dialog: Dialog,
    private notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.monitoringService.setAllIndications(mockIndictions);
    this.apiDataTechnicsService.getPredictFact(+mockIndictions[3].indications_work_shift.plan).subscribe(v => this.predictFact = v.data)
  }

  public findTechincs(): void {
    if (this.technicsForm.valid) {   
      this.apiDataTechnicsService.getWorkShiftDate(this.technicsForm.value).subscribe()
    }
  }

  public openDialog(data: { data: ITechnicData, name: string}): void {
    this.dialog.open(DialogChartComponent, {
      width:  '800px',
      height: '800px',
      data: data,
    });
  }

  public getNewObj(readings: number[]): number[] {
    return [...readings];
  }

  public runCurrentWorkShift() {
    this.monitoringService.setAllIndications([...mockIndictions]);
    this.showYellowNotification();
    this.showRedNotification();
  }

  public showYellowNotification(): void {
    this.notificationService.yellow('Yellow alertasd asd asdasdasdasdasdqeacvsdvs df 21334sdddddddddddddddddddddddddddddddddddddddddddd!');
  }

  public showRedNotification(): void {
    this.notificationService.red('Red errorааааааааааааааааааааааааааааааааааlorem  asdasdasdasdas!');
  }
}

