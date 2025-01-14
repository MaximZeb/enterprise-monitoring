import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public isShowCreateAccount: boolean = true;
  public constructor() { }

  public ngOnInit(): void {}

  public toggleForms(isShow: boolean): void {
    this.isShowCreateAccount = isShow;
  }
}
