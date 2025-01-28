import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressSpinnerService {
  public isShowProgressSpiner: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public onProgressSpiner(): void {
    this.isShowProgressSpiner.next(true);
  }

  public offProgressSpiner(): void {
    this.isShowProgressSpiner.next(false);
  }
}
