import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringComponent } from './monitoring.component';
import { MineSectionComponent } from '../mine-section/mine-section.component';
import { MineCombineComplexsComponent } from '../mine-combine-complexs/mine-combine-complexs.component';

const routes: Routes = [
  { path: '', component: MonitoringComponent, children: [
    { path: 'sections', component: MineSectionComponent },
    { path: 'sections/combine', component: MineCombineComplexsComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
