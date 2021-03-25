import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionCommentBoxComponent } from './contribution-comment-box.component';

describe('ContributionCommentBoxComponent', () => {
  let component: ContributionCommentBoxComponent;
  let fixture: ComponentFixture<ContributionCommentBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionCommentBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionCommentBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
