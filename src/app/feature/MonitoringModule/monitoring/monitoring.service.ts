import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICombineComplexs, IResourceData, ISection, ITechnicData, IWorkShiftMonthPlan } from '../../API/api.interface';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  public userData: BehaviorSubject<IResourceData | null> = new BehaviorSubject<IResourceData | null>(null);
  public sectionData: BehaviorSubject<ISection | null> = new BehaviorSubject<ISection | null>(null);
  public combineData: BehaviorSubject<ICombineComplexs | null> = new BehaviorSubject<ICombineComplexs | null>(null);
  public dataTechnics: BehaviorSubject<ITechnicData[] | null> = new BehaviorSubject<ITechnicData[] | null>(null);
  public workShiftData: BehaviorSubject<IWorkShiftMonthPlan | null> = new BehaviorSubject<IWorkShiftMonthPlan | null>(null);
  public xData: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  public setUserData(data: IResourceData): void {
    this.userData.next(data);
  }

  public getUserData(): Observable<IResourceData | null> {
    return this.userData;
  }

  public setSectionData(data: ISection): void {
    this.sectionData.next(data);
  }

  public getSectionData(): Observable<ISection | null> {
    return this.sectionData;
  }
  
  public setCombineData(data: ICombineComplexs): void {
    this.combineData.next(data);
  }

  public getCombineData(): Observable<ICombineComplexs | null> {
    return this.combineData;
  }

  public getTechnicsData(): Observable<ITechnicData[] | null> {
    return this.dataTechnics;
  }

  public setTechnicsData(dataTechnics: ITechnicData[]): void {
    return this.dataTechnics.next(dataTechnics);
  }

  public getWorkShiftData(): Observable<IWorkShiftMonthPlan | null> {
    return this.workShiftData;
  }

  public setWorkShiftData(dataTechnics: IWorkShiftMonthPlan): void {
    return this.workShiftData.next(dataTechnics);
  }

  public getXData(): Observable<any | null> {
    return this.xData;
  }

  public setXData(dataTechnics: any): void {
    return this.xData.next(dataTechnics);
  }
}
