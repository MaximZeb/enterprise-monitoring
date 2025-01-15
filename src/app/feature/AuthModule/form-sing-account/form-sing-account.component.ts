import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProgressSpinnerService } from 'src/app/progress-spiner/progress-spinner.service';

@Component({
  selector: 'form-sing-account',
  templateUrl: './form-sing-account.component.html',
  styleUrls: ['./form-sing-account.component.scss']
})
export class FormSingAccountComponent implements OnInit {
  @Output() public isSingUp = new EventEmitter<boolean>(); 
  public hide: boolean = true;
  
  public registrationForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  
  public constructor(private progressSpinnerService: ProgressSpinnerService) { }

  public ngOnInit(): void {}

  public transition(): void {
    this.isSingUp.emit(false);
  };

  public singUpAccount(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    }
  }
}
