import { Component, OnInit } from '@angular/core';
import { IResourceData } from '../../API/api.interface';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitoringService } from '../monitoring/monitoring.service';

@Component({
  selector: 'app-mine-section',
  templateUrl: './mine-section.component.html',
  styleUrls: ['./mine-section.component.scss']
})
export class MineSectionComponent implements OnInit {
  public mineData: Observable<IResourceData | null> = this.monitoringService.getUserData();

  public constructor(private router: Router, private activatedRoute: ActivatedRoute, private monitoringService: MonitoringService) { }

  public ngOnInit(): void {
    const mine: IResourceData = JSON.parse(this.activatedRoute.snapshot.queryParams['mineData']);
    this.monitoringService.setUserData(mine);
    
  }
}
