import { Injectable } from '@angular/core';
import { ApiService } from '../../API/api.service';
import { ProgressSpinnerService } from 'src/app/progress-spiner/progress-spinner.service';
import { MonitoringService } from '../monitoring/monitoring.service';
import { catchError, filter, forkJoin, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { IAllIndications, IIdDateWorkShift, IIndicationsMonth, IIndicationsWorkShift, IResponse, ISection, ITechnicData, IWorkShiftMonthPlan } from '../../API/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiDataTechnicsService {
  constructor(
    private apiService: ApiService,
    private progressSpinnerService: ProgressSpinnerService,
    private monitoringService: MonitoringService,
  ) { }

  public getIndectionsDataTechnicsRealtime(): Observable<IAllIndications> {
    this.progressSpinnerService.onProgressSpiner();
  
    return this.apiService.get<IAllIndications>(`${this.apiService.rootUrl}/real_time`).pipe(
      map((technic: IResponse<IAllIndications>) => technic.data),
      tap(() => this.progressSpinnerService.offProgressSpiner()),
      tap((data: IAllIndications) => {
        this.monitoringService.setAllIndications(data)
      }),
      catchError((err) => {
        this.progressSpinnerService.offProgressSpiner();
        console.error('Error during forkJoin:', err);
        return throwError(() => err);
      })
    );
  }

  public getWorkShiftDate(workShiftDate: {date: Date, workingShift: string }): Observable<IAllIndications> {
    this.progressSpinnerService.onProgressSpiner();

    return this.apiService.get<IIdDateWorkShift>(`${this.apiService.rootUrl}/work_shift/1/${workShiftDate.workingShift}/`).pipe(
      map((technic: IResponse<IIdDateWorkShift>) => technic.data),
      tap(() => this.progressSpinnerService.offProgressSpiner()),
      switchMap((idDocuments: IIdDateWorkShift) => {
        return forkJoin([
          this.apiService.get<ITechnicData>(`${this.apiService.rootUrl}/combine/${idDocuments.combineId}`).pipe(
            map((technic: IResponse<ITechnicData>) => technic.data)),
          this.apiService.get<ITechnicData>(`${this.apiService.rootUrl}/samohodniiVagon/${idDocuments.samohodniVagonId}`).pipe(
            map((technic: IResponse<ITechnicData>) => technic.data)),
          this.apiService.get<ITechnicData>(`${this.apiService.rootUrl}/bunker/${idDocuments.bunkerId}`).pipe(
            map((technic: IResponse<ITechnicData>) => technic.data)),
          this.apiService.get<IIndicationsWorkShift>(`${this.apiService.rootUrl}/work_shift/${idDocuments.workShiftId}`).pipe(
            map((technic: IResponse<IIndicationsWorkShift>) => technic.data)),
          this.apiService.get<IIndicationsMonth>(`${this.apiService.rootUrl}/month_plan/${idDocuments.monthPlanId}`).pipe(
            map((technic: IResponse<IIndicationsMonth>) => technic.data))
        ]).pipe(
          tap((data: IAllIndications) => {
            this.monitoringService.setAllIndications(data)
          })
        );
      }),
      catchError((err) => {
        this.progressSpinnerService.offProgressSpiner();
        console.error('Error during forkJoin:', err);
        return throwError(() => []);
      })
    );
  }
}
