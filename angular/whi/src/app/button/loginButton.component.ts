import { Component } from '@angular/core';

import LoginStateService from '../loginstate.service';

@Component({
  selector: 'LoginButton',
  imports: [],
  template: `<div class="login-button" (click)="doLogin('Daniël')">Login</div>`,
  styles: `
:host, .login-button {
  height: 18px;
}

.login-button {
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

export default class LoginButton {
  constructor(public loginStateService: LoginStateService) {};
  
  doLogin(name: string) {
    this.loginStateService.login(name);
  }
};
