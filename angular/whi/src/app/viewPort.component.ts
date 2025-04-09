import { Component, ViewChild } from '@angular/core';

import LogoBar from './logoBar.component';
import TimeBar from './timeBar.component';
import MapPanel from './mapPanel.component';
import DetailPanel from './detailPanel.component';

@Component({
  selector: 'ViewPort',
  imports: [LogoBar, TimeBar, MapPanel, DetailPanel],
  template: `
    <div class="view-port">
        <LogoBar />
        <div class="panels-row">
            <MapPanel />
            <DetailPanel />
        </div>
        <TimeBar />
    </div>
  `,
  styles: `
    :host, .view-port {
      display: flex;
      flex-flow: column nowrap;
      align-items: stretch;
      width: 100%;
      height: 100%;
    }

    .panels-row {
      display: flex;
      flex-flow: row nowrap;
      align-items: stretch;
      flex: 1;
    }
  `
})
export class ViewPort {
  @ViewChild(MapPanel) mapPanel:MapPanel|null = null;

  ngAfterViewInit() {
    // child is set
    this.mapPanel?.init();
  }
}
