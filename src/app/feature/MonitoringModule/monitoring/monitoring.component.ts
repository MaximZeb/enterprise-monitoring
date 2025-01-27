import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }
  public mineData!: Observable<any>;

  ngOnInit(): void {
    this.mineData = this.activatedRoute.paramMap;
  }

}
