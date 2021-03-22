import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-page404',
  template: `
    <nz-result nzStatus="404" nzTitle="404" nzSubTitle="Sorry, the page you visited does not exist.">
      <div nz-result-extra>
        <button nz-button nzType="primary" routerLink="/">Back Home</button>
      </div>
    </nz-result>`,
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
