import { Injectable } from '@angular/core';
import { ApiService } from '../../API/api.service';
import { ProgressSpinnerService } from 'src/app/progress-spiner/progress-spinner.service';
import { MonitoringService } from '../monitoring/monitoring.service';
import { catchError, filter, forkJoin, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
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
      map(section => { // Добавляем map для обработки null
        if (section === null) {
          throw new Error(`Section with id not found`); // Или верните какое-то значение по умолчанию
        }
        return section;
      }),
      switchMap((v: ISection) => {
        return forkJoin([
          this.apiService.get<any>(`${this.apiService.rootUrl}/combine/${v.combine_complexs[0].combineId}`),
          this.apiService.get<any>(`${this.apiService.rootUrl}/samohodniiVagon/${v.combine_complexs[0].bunkerId}`),
          this.apiService.get<any>(`${this.apiService.rootUrl}/bunker/${v.combine_complexs[0].samohodniVagonId}`)
        ]);
      }),
      catchError((err) => {
        this.progressSpinnerService.offProgressSpiner();
        console.error('Error during forkJoin:', err);
        // Здесь можно вернуть Observable с дефолтными значениями, если это имеет смысл для вашей логики
        // или пробросить ошибку дальше, чтобы обработать ее в subscribe
        return throwError(() => err); // Пробрасываем ошибку дальше
      })
      // .pipe(
      //   tap((dataTechnics: any[]) => this.monitoringService.setTechnicsData(dataTechnics)),
      //   tap(() => this.progressSpinnerService.offProgressSpiner()),
      //   map((dataTechnics: any[]) => dataTechnics)
      // ),
    )
  }
}
