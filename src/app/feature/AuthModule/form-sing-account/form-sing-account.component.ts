import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiRegistryEnteryAccountService } from '../api-registry-entery-account-service/api-registry-entery-account.service';
import { Router } from '@angular/router';
import { IResourceData } from '../../API/api.interface';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'form-sing-account',
  templateUrl: './form-sing-account.component.html',
  styleUrls: ['./form-sing-account.component.scss']
})
export class FormSingAccountComponent {
  @Output() public isSingUp: EventEmitter<boolean> = new EventEmitter<boolean>(); 
  public hide: boolean = true;
  
  public registrationForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  
  public constructor (
    private apiRegistryEnteryAccountService: ApiRegistryEnteryAccountService,
    private router: Router
  ) { }

  public transition(): void {
    this.isSingUp.emit(false);
  };

  public singUpAccount(): void {
    if (this.registrationForm.valid) {
      this.apiRegistryEnteryAccountService.entryAccount(this.registrationForm.value).pipe(
        catchError(() => {
              return EMPTY;
        })).subscribe((data: IResourceData | null) => {
        if (data) {
          const JSONMine: string = JSON.stringify(data);

          this.router.navigate(['/monitoring'], {
            queryParams: { mineData: JSONMine },
             replaceUrl: true
          })
        }
      });
    }
  }
}
