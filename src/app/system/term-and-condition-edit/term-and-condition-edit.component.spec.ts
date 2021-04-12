import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermAndConditionEditComponent } from './term-and-condition-edit.component';

describe('TermAndConditionEditComponent', () => {
  let component: TermAndConditionEditComponent;
  let fixture: ComponentFixture<TermAndConditionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermAndConditionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermAndConditionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
