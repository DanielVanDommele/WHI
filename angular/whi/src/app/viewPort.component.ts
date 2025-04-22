import { Component, effect, inject, ViewChild } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from "primeng/api";

import LogoBar from './logoBar.component';
import TimeBar from './timeBar.component';
import MapPanel from './mapPanel.component';
import DetailPanel from './detailPanel.component';

import WindowStateService from './services/state/windowstate.service';
import LoginStateService from './services/state/loginstate.service';
import SignupWindow from './window/signupWindow.component';
import LoginWindow from './window/loginWindow.component';
import ForgotPasswordWindow from './window/forgotPasswordWindow.component';
import CreateNewPasswordWindow from './window/createNewPasswordWindow.component';

@Component({
  selector: 'ViewPort',
  imports: [
    LogoBar,
    TimeBar,
    MapPanel,
    DetailPanel,
    ToastModule,
    SignupWindow,
    LoginWindow,
    ForgotPasswordWindow,
    CreateNewPasswordWindow
  ],
  template: `
    <div class="view-port">
        <LogoBar />
        <div class="panels-row">
            <MapPanel />
            <DetailPanel />
        </div>
        <TimeBar />
        @if (isWindowVisible("signup")) {
          <SignupWindow />
        }
        @if (isWindowVisible("login")) {
          <LoginWindow />
        }
        @if (isWindowVisible("forgotPassword")) {
          <ForgotPasswordWindow />
        }
        @if (isWindowVisible("newPassword")) {
          <CreateNewPasswordWindow />
        }
        <p-toast position="center" />
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
  windowStateService = inject(WindowStateService);
  loginStateService = inject(LoginStateService);
  messageService = inject(MessageService);

  constructor() {
    this.windowStateService.registerWindow("signup");
    this.windowStateService.registerWindow("login");
    this.windowStateService.registerWindow("forgotPassword");
    this.windowStateService.registerWindow("newPassword");
  }

  ngAfterViewInit() {
    this.mapPanel?.init();
  }

  isWindowVisible(windowId: string): boolean {
    return this.windowStateService.getIsWindowVisible(windowId);
  }
}
