import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IMine } from '../../API/api.interface';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  public mineData: Observable<IMine | null> = of(null);
  public constructor(private activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    const mine: IMine = JSON.parse(this.activatedRoute.snapshot.queryParams['mineData'])
    this.mineData = of(mine);
  }
}