import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineSectionComponent } from './mine-section.component';

describe('MineSectionComponent', () => {
  let component: MineSectionComponent;
  let fixture: ComponentFixture<MineSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MineSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MineSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
