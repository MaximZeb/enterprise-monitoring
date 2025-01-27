import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  public mineData!: Observable<any>;
  public constructor(private activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    const str = JSON.parse(this.activatedRoute.snapshot.queryParams['mineData'])
    this.mineData = of(str);
  }
}
