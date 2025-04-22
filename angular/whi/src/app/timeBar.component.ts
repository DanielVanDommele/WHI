import { Component } from '@angular/core';

@Component({
  selector: 'TimeBar',
  imports: [],
  template: `<div class="time-bar"> </div>`,
  styles: `
:host, .time-bar {
  height: 40px;
}
.time-bar {
  align-items: stretch;
  background: #09a2e4;
  border-top: 2px solid #000000;
  color: #ffffff;
  font-family: Tahoma;
  font-size: 22px;
  font-style: italic;
  font-weight: Bold;
  padding-left: 5px;
  vertical-align: middle;
}
  `
})
export default class TimeBar {
}
