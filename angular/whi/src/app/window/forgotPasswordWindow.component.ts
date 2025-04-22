import { AfterViewInit, Component, inject } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';

import WindowStateService from "../services/state/windowstate.service";

@Component({
    selector: 'ForgotPasswordWindow',
    imports: [
        ButtonModule,
        FormsModule,
        InputTextModule
    ],
    template: `<div class="forgot-password-window">
        <div class="title-bar">I forgot my password</div>
        <div class="form-area">
            <label>Enter your email address: </label>
            <br />
            <input type="email" pInputText size="40" name="emailValue" [(ngModel)]="emailValue" email="true" />
        </div>
        <div class="button-area">
            <p-button label="Submit" class="form-button" icon="pi pi-check" [disabled]="emailValue !== ''" (onClick)="submit()" />
            <p-button label="Cancel" class="form-button" icon="pi pi-times" (onClick)="close()" />
        </div>
    </div>`,
    styles: `
        :host {
            position: absolute;
            top: 0px;
            left: 0px;
            z-index: 1000;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(127,127,127,.6);
        }

        .forgot-password-window {
            display: flex;
            flex-flow: column nowrap;
            align-items: stretch;
            border: 2px solid #09a2e4;
            background: #FFFFFF;
            padding: 0px;
            width: 400px;
            height: 160px;
        }

        .title-bar {
            height: 25px;
            background: #09A2E4;
            color: #FFFFFF;
            padding-top: 4px;
            text-align: center;
            font-weight: Bold;
            font-size: 14px;
        }

        .form-area {
            height: 70px;
            padding: 8px;
        }

        .form-button {
            padding: 0px 8px;
        }

        .button-area {
            text-align: center;
            padding: 10px;
            height: 34px;
        }
    `
})
export default class ForgotPasswordWindow implements AfterViewInit {
    emailValue: string = "";

    constructor() {
        //
    }

    ngAfterViewInit() {
        // child is set (so they say)
    }

    windowStateService: WindowStateService = inject(WindowStateService);

    close() {
        this.emailValue = "";
        this.windowStateService.setIsWindowVisible("forgotPassword", false);
    }

    submit() {
        // TODO: send to backend request for sending nonce mail
    }
}