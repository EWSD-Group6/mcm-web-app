import {Component, Input, OnInit} from '@angular/core';
import {UserUserCreateReq} from '../../../api';
import RoleEnum = UserUserCreateReq.RoleEnum;

@Component({
  selector: 'app-role-tag',
  templateUrl: './role-tag.component.html',
  styleUrls: ['./role-tag.component.scss']
})
export class RoleTagComponent implements OnInit {

  @Input() role: RoleEnum;
  constructor() { }

  ngOnInit(): void {
  }

}
