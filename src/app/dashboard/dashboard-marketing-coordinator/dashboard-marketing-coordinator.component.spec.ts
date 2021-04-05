import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMarketingCoordinatorComponent } from './dashboard-marketing-coordinator.component';

describe('DashboardMarketingCoordinatorComponent', () => {
  let component: DashboardMarketingCoordinatorComponent;
  let fixture: ComponentFixture<DashboardMarketingCoordinatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMarketingCoordinatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMarketingCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
