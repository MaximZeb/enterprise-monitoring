import { Component, OnInit } from '@angular/core';
import { ICombineComplexs, ISection } from '../../API/api.interface';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitoringService } from '../monitoring/monitoring.service';

@Component({
  selector: 'app-mine-combine-complexs',
  templateUrl: './mine-combine-complexs.component.html',
  styleUrls: ['./mine-combine-complexs.component.scss']
})
export class MineCombineComplexsComponent implements OnInit {
  public sectionData: Observable<ISection | null> = this.monitoringService.getSectionData();

  public constructor(private activatedRoute: ActivatedRoute, private monitoringService: MonitoringService, private router: Router) { }

  public ngOnInit(): void { }

  public transition(section: ICombineComplexs): void {
    this.monitoringService.setCombineData(section);
    this.router.navigate(['./technics'], { relativeTo: this.activatedRoute, replaceUrl: true }); 
  }
}
