import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineCombineComplexsComponent } from './mine-combine-complexs.component';

describe('MineCombineComplexsComponent', () => {
  let component: MineCombineComplexsComponent;
  let fixture: ComponentFixture<MineCombineComplexsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MineCombineComplexsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MineCombineComplexsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
