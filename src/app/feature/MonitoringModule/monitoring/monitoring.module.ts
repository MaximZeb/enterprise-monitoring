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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { ChartComponent } from '../chart/chart.component';

// Настройка формата даты
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    MonitoringComponent,
    MineSectionComponent,
    MineCombineComplexsComponent,
    MineTechnincsHeadComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MonitoringRoutingModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // Это также важно для корректного отображения даты в формате DD/MM/YYYY
  ]
})
export class MonitoringModule { }
