import { AfterViewInit, Component, inject } from "@angular/core";
import { ButtonModule } from "primeng/button";

import WindowStateService from "../services/state/windowstate.service";
import UserPasswordField from "../form/fields/userPasswordField.component";

@Component({
    selector: 'CreateNewPasswordWindow',
    imports: [
        ButtonModule,
        UserPasswordField
    ],
    template: `<div class="login-window">
        <div class="title-bar">Login</div>
        <div class="form-area">
            <UserPasswordField (changedValue)="onChangedPassword($event)" (isValid)="onIsPasswordValid($event)" />
        </div>
        <div class="button-area">
            <p-button label="Submit" class="form-button" icon="pi pi-check" [disabled]="!isPasswordValid" (onClick)="submit()" />
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

        .login-window {
            display: flex;
            flex-flow: column nowrap;
            align-items: stretch;
            border: 2px solid #09a2e4;
            background: #FFFFFF;
            padding: 0px;
            width: 450px;
            height: 330px;
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
            height: 240px;
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
export default class CreateNewPasswordWindow implements AfterViewInit {
    password: string = "";
    isPasswordValid: boolean = false;

    windowStateService: WindowStateService = inject(WindowStateService);

    constructor() {
        //
    }

    ngAfterViewInit() {
        // child is set (so they say)
    }

    onChangedPassword(value: string) {
        this.password = value;
    }

    onIsPasswordValid(value: boolean) {
        this.isPasswordValid = value;
    }

    close() {
        this.password = "";
        this.isPasswordValid = false;
        this.windowStateService.setIsWindowVisible("newPassword", false);
    }

    submit() {
        // TODO: send login data to backend
    }
}