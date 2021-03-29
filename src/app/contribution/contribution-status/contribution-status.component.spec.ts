import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionStatusComponent } from './contribution-status.component';

describe('ContributionStatusComponent', () => {
  let component: ContributionStatusComponent;
  let fixture: ComponentFixture<ContributionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
