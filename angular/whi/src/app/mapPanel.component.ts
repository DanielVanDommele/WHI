import { Component } from '@angular/core';

@Component({
  selector: 'MapPanel',
  imports: [],
  template: `Where was I?<br />
    When was I there?<br />
    Who was there with me?<br />
    What was I doing there?<br />
    Why was I there?<br />`,
  styles: `
:host {
  flex: 1;
  padding: 20px;
  font-size: 16px;
  font-family: Tahoma;
}
  `
})
export default class MapPanel {
}
