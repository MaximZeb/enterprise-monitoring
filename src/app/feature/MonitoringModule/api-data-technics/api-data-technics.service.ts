import { Injectable } from '@angular/core';
import { ApiService } from '../../API/api.service';
import { ProgressSpinnerService } from 'src/app/progress-spiner/progress-spinner.service';
import { MonitoringService } from '../monitoring/monitoring.service';
import { catchError, filter, forkJoin, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { IIdDateWorkShift, IIndicationsMonth, IIndicationsWorkShift, IResponse, ISection, ITechnicData, IWorkShiftMonthPlan } from '../../API/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiDataTechnicsService {
  constructor(
    private apiService: ApiService,
    private progressSpinnerService: ProgressSpinnerService,
    private monitoringService: MonitoringService,
  ) { }

  public getIndectionsDataTechnics(): Observable<any> {
    this.progressSpinnerService.onProgressSpiner();

    return this.monitoringService.getSectionData().pipe(
      filter((v: ISection | null) => !!v),
      map(section => {
        if (section === null) {
          throw new Error(`Section with id not found`); 
        }
        return section;
      }),
      switchMap((section: ISection) => {
        return forkJoin([
          this.apiService.get<ITechnicData>(`${this.apiService.rootUrl}/combine/${section.combine_complexs[0].combineId}`).pipe(
            map((technic: IResponse<ITechnicData>) => technic.data)),
          this.apiService.get<ITechnicData>(`${this.apiService.rootUrl}/samohodniiVagon/${section.combine_complexs[0].samohodniVagonId}`).pipe(
            map((technic: IResponse<ITechnicData>) => technic.data)),
          this.apiService.get<ITechnicData>(`${this.apiService.rootUrl}/bunker/${section.combine_complexs[0].bunkerId}`).pipe(
            map((technic: IResponse<ITechnicData>) => technic.data))
        ]);
      }),
      switchMap((technicsData: ITechnicData[]) => {
        this.monitoringService.setTechnicsData(technicsData)
        return technicsData;
      }),
      tap(() => this.progressSpinnerService.offProgressSpiner()),
      catchError((err) => {
        this.progressSpinnerService.offProgressSpiner();
        console.error('Error during forkJoin:', err);
        return throwError(() => err);
      })
    )
  }

  public getIndectionsWorkShift(): Observable<any> {
    this.progressSpinnerService.onProgressSpiner();

    return this.monitoringService.getSectionData().pipe(
      filter((v: ISection | null) => !!v),
      map(section => {
        if (section === null) {
          throw new Error(`Section with id not found`); 
        }
        return section;
      }),
      switchMap((section: ISection) => {
        return this.apiService.get<IWorkShiftMonthPlan>(`${this.apiService.rootUrl}/work_shift/${section.combine_complexs[0].work_shift}`).pipe(
          map((technic: IResponse<IWorkShiftMonthPlan>) => technic.data),
          tap(workShiftData => {
            if (workShiftData) {
                this.monitoringService.setWorkShiftData(workShiftData);
            }
        })
        );
      }),
      tap(() => this.progressSpinnerService.offProgressSpiner()),
      catchError((err) => {
        this.progressSpinnerService.offProgressSpiner();
        console.error('Error during forkJoin:', err);
        return throwError(() => err);
      })
    )
  }

  public getWorkShiftDate(workShiftDate: {date: Date, workingShift: string }): Observable<[ITechnicData, ITechnicData, ITechnicData, IIndicationsWorkShift, IIndicationsMonth]> {
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
          tap((data: [ITechnicData, ITechnicData, ITechnicData, IIndicationsWorkShift, IIndicationsMonth]) => {
            this.monitoringService.setXData(data)
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
