import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SystemDataApiService} from '../../api';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-term-and-condition-edit',
  templateUrl: './term-and-condition-edit.component.html',
  styleUrls: ['./term-and-condition-edit.component.scss']
})
export class TermAndConditionEditComponent implements OnInit {
  control = new FormControl(null, [Validators.required]);

  constructor(private api: SystemDataApiService,
              private nzMessageService: NzMessageService) {
    this.api.systemDataGet().subscribe(
      x => {
        this.control.patchValue(x.find(item => item.key === 'term_and_condition').value);
      }
    );
  }

  ngOnInit(): void {
  }

  save(): void {
    if (this.control.valid) {
      this.api.systemDataIdPut('term_and_condition', {
        value: this.control.value
      }).subscribe(
        () => this.nzMessageService.success('Term and Condition saved')
      );
    }
  }
}
