import { Injectable } from '@angular/core';
import { ApiService } from '../../API/api.service';
import { ProgressSpinnerService } from 'src/app/progress-spiner/progress-spinner.service';
import { MonitoringService } from '../monitoring/monitoring.service';
import { filter, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { ISection } from '../../API/api.interface';

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
      switchMap((v: ISection) => {
        return forkJoin([
          this.apiService.get(`${this.apiService.rootUrl}/combine/${v.combine_complexs[0].combineId}`),
          this.apiService.get(`${this.apiService.rootUrl}/combine/${v.combine_complexs[0].bunkerId}`),
          this.apiService.get(`${this.apiService.rootUrl}/combine/${v.combine_complexs[0].samohodniVagonId}`)
        ]);
      })
      // .pipe(
      //   tap((dataTechnics: any[]) => this.monitoringService.setTechnicsData(dataTechnics)),
      //   tap(() => this.progressSpinnerService.offProgressSpiner()),
      //   map((dataTechnics: any[]) => dataTechnics)
      // ),
    )
  }
}
