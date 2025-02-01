import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineTechnincsHeadComponent } from './mine-technincs-head.component';

describe('MineTechnincsHeadComponent', () => {
  let component: MineTechnincsHeadComponent;
  let fixture: ComponentFixture<MineTechnincsHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MineTechnincsHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MineTechnincsHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
