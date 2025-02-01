import { Component, OnInit } from '@angular/core';
import { ISection } from '../../API/api.interface';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MonitoringService } from '../monitoring/monitoring.service';

@Component({
  selector: 'app-mine-combine-complexs',
  templateUrl: './mine-combine-complexs.component.html',
  styleUrls: ['./mine-combine-complexs.component.scss']
})
export class MineCombineComplexsComponent implements OnInit {
  public sectionData: Observable<ISection | null> = this.monitoringService.getSectionData();

  public constructor(private activatedRoute: ActivatedRoute, private monitoringService: MonitoringService) { }

  public ngOnInit(): void { }
}
