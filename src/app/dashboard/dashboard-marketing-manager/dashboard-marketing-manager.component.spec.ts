import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMarketingManagerComponent } from './dashboard-marketing-manager.component';

describe('DashboardMarketingManagerComponent', () => {
  let component: DashboardMarketingManagerComponent;
  let fixture: ComponentFixture<DashboardMarketingManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMarketingManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMarketingManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
