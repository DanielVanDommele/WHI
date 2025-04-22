import { Component } from '@angular/core';
import LoginStateService from './services/state/loginstate.service';
import Explanation from './details/explanation.component';
import SelectionDetails from './details/selectionDetails.component';

@Component({
  selector: 'DetailPanel',
  imports: [Explanation, SelectionDetails],
  template: `@if (isLoggedIn()) {
        <SelectionDetails />
      }
      @else {
        <Explanation />
      }
  `,
  styles: `
:host, .detail-panel {
  width: 300px;
  border-left: 2px solid #000000;
  font-family: Tahoma;
  text-align: center;
  padding-top: 12px;
}
  `
})
export default class DetailPanel {
  constructor(public loginStateService: LoginStateService) {}

  isLoggedIn() : boolean {
    return this.loginStateService.getIsLoggedIn() === true;
  }
}
