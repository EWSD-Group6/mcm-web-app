import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../auth/authentication.service';
import {UserUserCreateReq} from '../../api';
import RoleEnum = UserUserCreateReq.RoleEnum;
import {FormControl} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {ContributionService} from '../state/contribution.service';
import {Contribution} from '../state/contribution.model';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-contribution-status',
  templateUrl: './contribution-status.component.html',
  styleUrls: ['./contribution-status.component.scss']
})
export class ContributionStatusComponent implements OnInit {
  @Input() contribution: Contribution;
  canEdit = false;
  statusControl = new FormControl();

  constructor(private authenticationService: AuthenticationService,
              private service: ContributionService) {
    this.canEdit = this.authenticationService.getCurrentRole() === RoleEnum.MarketingCoordinator;
  }

  ngOnInit(): void {
    if (this.canEdit) {
      this.statusControl.setValue(this.contribution.status);
      this.statusControl.valueChanges.pipe(
        untilDestroyed(this),
        switchMap(value => this.service.updateStatus(this.contribution.id, value))
      ).subscribe();
    }
  }

}
