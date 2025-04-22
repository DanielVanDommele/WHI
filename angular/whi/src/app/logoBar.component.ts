import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import LoginStateService from './services/state/loginstate.service';
import WindowStateService from './services/state/windowstate.service';
import LoginRequestService from './services/loginRequest.service';

@Component({
  selector: 'LogoBar',
  imports: [ButtonModule],
  template: `<div class="logo-bar">
  <div class="logo-text">WHI? (Angular version)</div>
    <div class="login-info">{{ showLoginInformation() }}</div>
    <div class="button-space">
      @if (isLoggedIn()) {
        <p-button label="Log out" size="small" class="bar-button" (onClick)="logout()" />
      }
      @else {
        <p-button label="Log in" size="small" class="bar-button" (onClick)="login()" />
        <p-button label="Sign up!" size="small" class="bar-button" (onClick)="signup()" />
      }
    </div>
  </div>`,
  styles: `
:host, .logo-bar {
  height: 40px;
}

.logo-bar {
  align-items: stretch;
  display: flex;
  flex-flow: row nowrap;
  background: #09a2e4;
  align-items: center;
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
  padding-right: 5px;
  text-align: right;
}

.button-space {
  display: flex;
  flex-flow: row nowrap;
  padding: 0px 1px;
  margin: 0px;
}

.bar-button {
  border: 1px solid #EFEFEF;
  border-radius: 5px;
  margin: 2px 8px;
}
  `
})
export default class LogoBar {
  loginStateService = inject(LoginStateService);
  loginRequestService = inject(LoginRequestService);
  windowStateService = inject(WindowStateService);

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

  login() {
    this.windowStateService.setIsWindowVisible('login', true);
  }

  logout() {
    this.loginRequestService.logout();
  }

  signup() {
    this.windowStateService.setIsWindowVisible('signup', true);
  }
}
