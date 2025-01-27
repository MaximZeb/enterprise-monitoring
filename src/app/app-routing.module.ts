import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./feature/AuthModule/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'monitoring',
    loadChildren: () => import('./feature/MonitoringModule/monitoring/monitoring.module').then(m => m.MonitoringModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
