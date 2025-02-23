import { Injectable } from '@angular/core';
import { ApiService } from '../../API/api.service';
import { ProgressSpinnerService } from 'src/app/progress-spiner/progress-spinner.service';
import { MonitoringService } from '../monitoring/monitoring.service';
import { catchError, filter, forkJoin, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { IResponse, ISection, ITechnicData } from '../../API/api.interface';

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
            map((technic: IResponse<ITechnicData>) => technic.data)),
          this.apiService.get<ITechnicData>(`${this.apiService.rootUrl}/work_shift/${section.combine_complexs[0].work_shift}`).pipe(
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
}
