import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiDataTechnicsService } from '../api-data-technics/api-data-technics.service';
import { MonitoringService } from '../monitoring/monitoring.service';
import { Observable } from 'rxjs';
import { ITechnicData, IWorkShiftMonthPlan } from '../../API/api.interface';
import { Dialog } from '@angular/cdk/dialog';
import { DialogChartComponent } from '../dialog-chart/dialog-chart.component';

@Component({
  selector: 'app-mine-technincs-head',
  templateUrl: './mine-technincs-head.component.html',
  styleUrls: ['./mine-technincs-head.component.scss']
})
export class MineTechnincsHeadComponent implements OnInit  {
  public tecnicsData: Observable<ITechnicData[] | null> = this.monitoringService.getTechnicsData();
  public workShiftData: Observable<IWorkShiftMonthPlan | null> = this.monitoringService.getWorkShiftData();
  public technicsForm: FormGroup = new FormGroup({
      date: new FormControl('', Validators.required),
      workingShift: new FormControl('', Validators.required)
  });

  constructor(
    private apiDataTechnicsService: ApiDataTechnicsService,
    private monitoringService: MonitoringService,
    private dialog: Dialog,
  ) {
      this.apiDataTechnicsService.getIndectionsDataTechnics().subscribe(c => console.log(c));
      this.apiDataTechnicsService.getIndectionsWork_Shift().subscribe(c => console.log(c));
    }

  public ngOnInit(): void {}

  public findTechincs(): void {
    if (this.technicsForm.valid) {
      console.log(this.technicsForm.value)
    }
  }

  public openDialog(data: { data: ITechnicData, name: string}): void {
    this.dialog.open(DialogChartComponent, {
      width:  '800px',
      height: '800px',
      data: data,
    });
  }
}

