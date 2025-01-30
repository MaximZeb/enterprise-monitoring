import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { MonitoringComponent } from './monitoring.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MineSectionComponent } from '../mine-section/mine-section.component';
import { MineCombineComplexsComponent } from '../mine-combine-complexs/mine-combine-complexs.component';
import { MineTechnincsHeadComponent } from '../mine-technincs-head/mine-technincs-head.component';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    MonitoringComponent,
    MineSectionComponent,
    MineCombineComplexsComponent,
    MineTechnincsHeadComponent
  ],
  imports: [
    CommonModule,
    MonitoringRoutingModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class MonitoringModule { }
