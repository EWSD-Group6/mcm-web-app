import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FacultyIndexComponent} from './faculty-index.component';

describe('FacultyIndexComponent', () => {
  let component: FacultyIndexComponent;
  let fixture: ComponentFixture<FacultyIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacultyIndexComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
