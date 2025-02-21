import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiDataTechnicsService } from '../api-data-technics/api-data-technics.service';
import { MonitoringService } from '../monitoring/monitoring.service';
import { Observable } from 'rxjs';
import { ITechnicData } from '../../API/api.interface';

@Component({
  selector: 'app-mine-technincs-head',
  templateUrl: './mine-technincs-head.component.html',
  styleUrls: ['./mine-technincs-head.component.scss']
})
export class MineTechnincsHeadComponent implements OnInit  {
  public tecnicsData: Observable<ITechnicData[] | null> = this.monitoringService.getTechnicsData();

  public data: any = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  public technicsForm: FormGroup = new FormGroup({
      date: new FormControl('', Validators.required),
      workingShift: new FormControl('', Validators.required)
  });

  constructor(private apiDataTechnicsService: ApiDataTechnicsService, private monitoringService: MonitoringService) {this.apiDataTechnicsService.getIndectionsDataTechnics().subscribe(c => console.log(c))}

  public ngOnInit(): void {}

  public findTechincs(): void {
    if (this.technicsForm.valid) {
      console.log(this.technicsForm.value)
    }
  }
}

