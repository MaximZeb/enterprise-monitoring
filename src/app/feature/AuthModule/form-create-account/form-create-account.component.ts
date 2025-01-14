import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'form-create-account',
  templateUrl: './form-create-account.component.html',
  styleUrls: ['./form-create-account.component.scss']
})
export class FormCreateAccountComponent implements OnInit {
  public registrationForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    aboutMe: new FormControl(),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  
  public register(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    }
  };

  public cancel(): void {
    this.registrationForm.reset();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
