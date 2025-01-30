import { Component, OnInit } from '@angular/core';
import { IResourceData } from '../../API/api.interface';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MonitoringService } from '../monitoring/monitoring.service';

@Component({
  selector: 'app-mine-section',
  templateUrl: './mine-section.component.html',
  styleUrls: ['./mine-section.component.scss']
})
export class MineSectionComponent implements OnInit {
  public mineData: Observable<IResourceData | null> = this.monitoringService.getUserData();

  public constructor(private activatedRoute: ActivatedRoute, private monitoringService: MonitoringService) { }

  public ngOnInit(): void {
    const mineData = this.activatedRoute.snapshot.queryParams['mineData'];

    if (mineData) {
      try {
        const mine: IResourceData = JSON.parse(mineData);
        this.monitoringService.setUserData(mine);
      } catch (error) {
        console.error('Ошибка парсинга mineData:', error);
      }
    } else {
      console.warn('mineData отсутствует в queryParams');
    }
  }
}
