import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IResourceData } from '../../API/api.interface';
import { MonitoringService } from './monitoring.service';
import { stopMock } from '../mine-technincs-head/mock-real-time';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  public mineData: Observable<IResourceData | null> = this.monitoringService.getUserData();

  public constructor(private router: Router, private activatedRoute: ActivatedRoute, private monitoringService: MonitoringService) { }

  public ngOnInit(): void {
    const mine: IResourceData = JSON.parse(this.activatedRoute.snapshot.queryParams['mineData']);
    this.monitoringService.setUserData(mine);
    this.router.navigate(['sections'], { relativeTo: this.activatedRoute, replaceUrl: true });
  }

  public navigateAuth(): void {
    stopMock();
    this.router.navigate(['/auth'], { replaceUrl: true });
  }
}