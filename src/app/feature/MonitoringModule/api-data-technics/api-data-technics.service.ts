import { Injectable } from '@angular/core';
import { ApiService } from '../../API/api.service';
import { ProgressSpinnerService } from 'src/app/progress-spiner/progress-spinner.service';
import { MonitoringService } from '../monitoring/monitoring.service';
import { catchError, forkJoin, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { IAllIndications, IIdDateWorkShift, IIndicationsMonth, IIndicationsWorkShift, IResponse, ITechnicData } from '../../API/api.interface';
import { NotificationService } from 'src/app/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiDataTechnicsService {
  constructor(
    private apiService: ApiService,
    private progressSpinnerService: ProgressSpinnerService,
    private monitoringService: MonitoringService,
    private notificationService: NotificationService
  ) { }

  public getPredictFact(plan: number): Observable<IResponse<{ fact: number }> | null> {
    const jsonUserInfo: string = JSON.stringify({ plan: plan });

    return this.apiService.post<{ fact: number }>(`${this.apiService.rootUrl}/predict`, jsonUserInfo).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.red(error?.error?.data?.message ? error?.error?.data?.message : 'Ошибка запроса прогноза ру', 60);
        
        return of(null);
      })
    );
  }

  public getWorkShiftDate(workShiftDate: {date: Date, workingShift: string }): Observable<IAllIndications> {
    const milesecunds: string = workShiftDate.date.getTime().toString();
    this.progressSpinnerService.onProgressSpiner();

    return this.apiService.get<IIdDateWorkShift>(`${this.apiService.rootUrl}/work_shift/1/1/`).pipe(
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
            let response: IAllIndications = data;
            response[0].indications[0].time = milesecunds;
            response[1].indications[0].time = milesecunds;
            response[2].indications[0].time = milesecunds;
            response[3].time = milesecunds;

            this.monitoringService.setAllIndications(data)
          })
        );
      }),
      catchError(() => {
        this.progressSpinnerService.offProgressSpiner();
        this.monitoringService.setAllIndications(null);
        return throwError(() => []);
      })
    );
  }
}
