import { Component } from '@angular/core';

@Component({
  selector: 'DetailPanel',
  imports: [],
  template: `DetailPanel`,
  styles: `
:host, .detail-panel {
  width: 300px;
  border-left: 2px solid #000000;
  font-size: 22px;
  font-weight: bold;
  font-style: italic;
  font-family: Tahoma;
  text-align: center;
  padding-top: 12px;
}
  `
})
export default class DetailPanel {
}
