import { Component } from '@angular/core';

@Component({
  selector: 'Explanation',
  imports: [],
  template: `<div class="explanation">
    <div class="cap-line">Welcome!</div><br />
    <div class="info-text">WHI is an application that allows you to record the places in time where you have been, with whom, for what purpose and why.</div><br />
    <div class="info-text">The WH in WHI stands for the words:<ul><li>Where</li><li>When</li><li>Who</li><li>What</li><li>Why</li></ul></div>
    <div class="info-text">Please login or if you haven't yet, create an account by clicking "Sign up" to start using WHI!</div>
  </div>`,
  styles: `
    :host, .explanation {
      display: flex;
      flex: 1;
      flex-flow: column nowrap;
    }
    
    .cap-line {
      font-size: 22px;
      font-weight: bold;
      text-align: center;
    }

    .info-text {
      text-align: left;
      padding: 0px 20px;
      font-size: 14px;
    }
    `
})
export default class Explanation {
}
