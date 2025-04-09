import { Component } from '@angular/core';

import LoginStateService from '../loginstate.service';

@Component({
  selector: 'LogoutButton',
  imports: [],
  template: `<div class="logout-button" (click)="doLogout()">Logout</div>`,
  styles: `
:host, .logout-button {
  height: 18px;
}

.logout-button {
  border: 1px solid #000000;
  background: #efefef;
  color: #000000;
  text-align: center;
  font-size: 14px;
  font-weight: Bold;
  font-family: Tahoma;
  padding: 2px 8px;
  margin: 3px 3px;
  cursor: pointer;
}`
})

export default class LogoutButton {
  constructor(public loginStateService: LoginStateService) {};
  
  doLogout() {
    this.loginStateService.logout();
  }
};
