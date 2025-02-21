import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartType, ChartTypeRegistry, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;

  @Input() public typeChart: ChartType  = 'bar';
  @Input() public indicitionsData: number [] = [12, 19, 3, 5, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3] as number[];
  @Input() public indicitionsTimesData: string[] = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  @Input() public labelChart: string  = 'Проходка, м';
  constructor() { }

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    const ctx = this.myChart.nativeElement.getContext('2d');

    const myChart = new Chart(ctx as CanvasRenderingContext2D, {
      type: this.typeChart, // тип графика
      data: {
        labels: this.indicitionsTimesData, // время
        datasets: [{
          label: this.labelChart, //название графика
          data: this.indicitionsData, // мои значения
          borderWidth: 1,
          backgroundColor: "#07c184", //цвет
          borderColor: "#07c184"
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
