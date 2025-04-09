import { Component } from '@angular/core';

import LoginStateService from '../loginstate.service';

@Component({
  selector: 'SignupButton',
  imports: [],
  template: `<div class="signup-button" (click)="signup()">Sign up!</div>`,
  styles: `
:host, .signup-button  {
  height: 18px;
}

.signup-button {
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
export default class SignupButton {
  constructor(public loginStateService: LoginStateService) {};
  
  signup() {
    //this.loginStateService.login(name);
  }
};
