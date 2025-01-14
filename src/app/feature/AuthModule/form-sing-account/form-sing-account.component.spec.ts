import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSingAccountComponent } from './form-sing-account.component';

describe('FormSingAccountComponent', () => {
  let component: FormSingAccountComponent;
  let fixture: ComponentFixture<FormSingAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSingAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSingAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
