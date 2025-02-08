import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mine-technincs-head',
  templateUrl: './mine-technincs-head.component.html',
  styleUrls: ['./mine-technincs-head.component.scss']
})
export class MineTechnincsHeadComponent implements OnInit {
  public technicsForm: FormGroup = new FormGroup({
      date: new FormControl('', Validators.required),
      workingShift: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

  public findTechincs(): void {
    
  }
}
