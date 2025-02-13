import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;

  constructor() { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    const ctx = this.myChart.nativeElement.getContext('2d');

    const myChart = new Chart(ctx as CanvasRenderingContext2D, {
      type: 'bar', // тип графика
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], // время
        datasets: [{
          label: 'Проходка, м', //название графика
          data: [12, 19, 3, 5, 2, 3], // мои значения
          borderWidth: 1,
          backgroundColor: "#07c184" //цвет
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
}
