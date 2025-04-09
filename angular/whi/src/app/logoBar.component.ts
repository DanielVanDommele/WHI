import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

import LoginStateService from './loginstate.service';
import LoginButton from './button/loginButton.component';
import LogoutButton from './button/logoutButton.component';
import SignupButton from './button/signupButton.component';

@Component({
  selector: 'LogoBar',
  imports: [LoginButton, LogoutButton, SignupButton],
  template: `<div class="logo-bar">
  <div class="logo-text">WHI? (Angular version)</div>
    <div class="login-info">{{ showLoginInformation() }}</div>
    <div class="button-space">
      @if (isLoggedIn()) {
        <LogoutButton />
      }
      @else {
        <LoginButton />
        <SignupButton />
      }
    </div>
  </div>`,
  styles: `
:host, .logo-bar {
  height: 30px;
}

.logo-bar {
  align-items: stretch;
  display: flex;
  flex-flow: row nowrap;
  background: #09a2e4;
  vertical-align: middle;
  border-bottom: 2px solid #000000;
}

.logo-text {
  color: #ffffff;
  flex: 2;
  font-family: Tahoma;
  font-size: 22px;
  font-style: italic;
  font-weight: Bold;
  padding-left: 5px;
}

.login-info {
  flex: 1;
  color: #000000;
  font-family: Tahoma;
  font-size: 14px;
  padding-top: 5px;
  padding-right: 5px;
  text-align: right;
}

.button-space {
  display: flex;
  flex-flow: row nowrap;
  padding: 0px 1px;
  margin: 0px;
}
  `
})
export default class LogoBar {
  constructor(public loginStateService: LoginStateService) {};

  showLoginInformation(): string {
    if (this.loginStateService.getIsLoggedIn()) {
      return `logged in as ${this.loginStateService.getLoginUserName()}`;
    } else {
      return "You are not yet logged in ";
    }
  }

  isLoggedIn() : boolean {
    return this.loginStateService.getIsLoggedIn() === true;
  }
}
