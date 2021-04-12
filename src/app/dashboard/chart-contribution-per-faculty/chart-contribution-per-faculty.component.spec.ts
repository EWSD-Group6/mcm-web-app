import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChartContributionPerFacultyComponent} from './chart-contribution-per-faculty.component';

describe('ChartContributionPerFacultyComponent', () => {
  let component: ChartContributionPerFacultyComponent;
  let fixture: ComponentFixture<ChartContributionPerFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartContributionPerFacultyComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartContributionPerFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
