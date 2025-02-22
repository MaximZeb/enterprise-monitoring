import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ITechnicData } from '../../API/api.interface';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-dialog-chart',
  templateUrl: './dialog-chart.component.html',
  styleUrls: ['./dialog-chart.component.scss']
})
export class DialogChartComponent implements OnInit {

  constructor(@Inject(DIALOG_DATA) public data: { data: ITechnicData, name: string}) {}

  ngOnInit(): void {
    console.log(this.data)
  }
}
