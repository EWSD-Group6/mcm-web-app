import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChartContributionPerStudentComponent} from './chart-contribution-per-student.component';

describe('ChartContributionPerStudentComponent', () => {
  let component: ChartContributionPerStudentComponent;
  let fixture: ComponentFixture<ChartContributionPerStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartContributionPerStudentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartContributionPerStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
