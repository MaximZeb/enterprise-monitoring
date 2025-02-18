import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringComponent } from './monitoring.component';
import { MineSectionComponent } from '../mine-section/mine-section.component';
import { MineCombineComplexsComponent } from '../mine-combine-complexs/mine-combine-complexs.component';
import { MineTechnincsHeadComponent } from '../mine-technincs-head/mine-technincs-head.component';

const routes: Routes = [
  { path: '', component: MonitoringComponent, children: [
    { path: 'sections', component: MineSectionComponent },
    { path: 'sections/combine', component: MineCombineComplexsComponent },
    { path: 'sections/combine/technics', component: MineTechnincsHeadComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
