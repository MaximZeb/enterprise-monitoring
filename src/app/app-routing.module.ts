import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./feature/AuthModule/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'monitoring',
    loadChildren: () => import('./feature/MonitoringModule/monitoring/monitoring.module').then(m => m.MonitoringModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
