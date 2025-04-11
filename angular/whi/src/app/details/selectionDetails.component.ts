import { Component } from '@angular/core';

@Component({
  selector: 'SelectionDetails',
  imports: [],
  template: `<div class="selection-details">What is selected? Otherwise summarizing data</div>`,
  styles: `
    :host, .selection-details {
    display: flex;
    flex: 1;
    }`
})
export default class SelectionDetails {
}
