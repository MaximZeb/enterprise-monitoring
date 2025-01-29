import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ProgressSpinerComponent } from './progress-spiner/progress-spiner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MineSectionComponent } from './feature/MonitoringModule/mine-section/mine-section.component';
import { MineCombineComplexsComponent } from './feature/MonitoringModule/mine-combine-complexs/mine-combine-complexs.component';
import { MineTechnincsHeadComponent } from './feature/MonitoringModule/mine-technincs-head/mine-technincs-head.component';
@NgModule({
  declarations: [
    AppComponent,
    ProgressSpinerComponent,
    MineSectionComponent,
    MineCombineComplexsComponent,
    MineTechnincsHeadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
