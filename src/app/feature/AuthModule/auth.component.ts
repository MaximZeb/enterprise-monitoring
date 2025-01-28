import { Component } from '@angular/core';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public isShowCreateAccount: boolean = true;

  public toggleForms(isShow: boolean): void {
    this.isShowCreateAccount = isShow;
  }
}
