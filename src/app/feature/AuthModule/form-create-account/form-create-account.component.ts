import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiRegistryEnteryAccountService } from '../api-registry-entery-account-service/api-registry-entery-account.service';
import { Router } from '@angular/router';
import { IMine, IResourceData } from '../../API/api.interface';

@Component({
  selector: 'form-create-account',
  templateUrl: './form-create-account.component.html',
  styleUrls: ['./form-create-account.component.scss']
})
export class FormCreateAccountComponent {
  @Output() public isSingUp: EventEmitter<boolean> = new EventEmitter<boolean>();

  public hide: boolean = true;

  public createForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    division: new FormControl('', Validators.required)
  });
  
  public constructor(private apiRegistryEnteryAccountService: ApiRegistryEnteryAccountService, private router: Router) { }

  public transition(): void {
    this.isSingUp.emit(true);
  };

  public createAccount(): void {
    if (this.createForm.valid) {
      this.apiRegistryEnteryAccountService.registryAccount(this.createForm.value).subscribe((data: IResourceData) => {
              const JSONMine: string = JSON.stringify(data);
      
              this.router.navigate(['/monitoring'], {
                queryParams: { mineData: JSONMine },
                replaceUrl: true
              })
      });
    }
  }
}
