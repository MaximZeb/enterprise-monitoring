import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-mine-technincs-head',
  templateUrl: './mine-technincs-head.component.html',
  styleUrls: ['./mine-technincs-head.component.scss']
})
export class MineTechnincsHeadComponent implements OnInit, AfterViewInit  {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;

  public technicsForm: FormGroup = new FormGroup({
      date: new FormControl('', Validators.required),
      workingShift: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    const ctx = this.myChart.nativeElement.getContext('2d');

    const myChart = new Chart(ctx as CanvasRenderingContext2D, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], // время
        datasets: [{
          label: 'Проходка, м',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
          backgroundColor: "#07c184"
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  public findTechincs(): void {
    if (this.technicsForm.valid) {
      console.log(this.technicsForm.value)
    }
  }
}

