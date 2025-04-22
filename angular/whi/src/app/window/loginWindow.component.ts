import { AfterViewInit, Component, inject } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { PasswordModule } from "primeng/password";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";

import WindowStateService from "../services/state/windowstate.service";
import LoginRequestService from "../services/loginRequest.service";
import LoginStateService from "../services/state/loginstate.service";
import { Person } from "../../entity/person.entity";

@Component({
    selector: 'LoginWindow',
    imports: [
        ButtonModule,
        PasswordModule,
        FormsModule,
        InputTextModule
    ],
    template: `<div class="login-window">
        <div class="title-bar">Login</div>
        <div class="form-area">
            <div class="field-container">
                <label>Email adress: </label>
                <input type="email" pInputText size="40" name="email" [(ngModel)]="emailValue" email="true" (change)="checkAllowLogin()" />
            </div>
            <div class="field-container">
                <label>Password: </label>
                <p-button label="I Forgot my password" size="small" class="form-button" (onClick)="forgotPassword()" />
                <p-password [(ngModel)]="password" class="login-password-field" autocomplete="off" [style]="{'width': '100%', 'padding-right': '8px'}" [inputStyle]="{'width': '100%', 'padding-right': '8px'}" [feedback]="false" [toggleMask]="true" (onBlur)="checkAllowLogin()" />
            </div>
            <div class="login-failed-message">{{ loginFailedMessage }}</div>
        </div>
        <div class="button-area">
            <p-button label="Log in" class="form-button" icon="pi pi-check" [disabled]="!allowLogin" (onClick)="submit()" />
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
            width: 400px;
            height: 280px;
        }

        .login-password-field {
            padding: 4px 8px 4px 0px;
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
            height: 190px;
            padding-left: 8px;
        }

        .field-container {
            padding: 8px 0px;
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
export default class LoginWindow implements AfterViewInit {
    emailValue: string = "";
    password: string = "";
    allowLogin: boolean = false;

    loginFailedMessage: string = "";

    windowStateService: WindowStateService = inject(WindowStateService);
    loginRequestService: LoginRequestService = inject(LoginRequestService);
    loginStateService: LoginStateService = inject(LoginStateService);

    constructor() {
        //
    }

    ngAfterViewInit() {
        // child is set (so they say)
    }

    close() {
        this.emailValue = "";
        this.password = "";
        this.loginFailedMessage = "";
        this.windowStateService.setIsWindowVisible("login", false);
    }

    submit() {
        this.loginRequestService.login(this.emailValue, this.password)
            .then((person: Person|null) => {
                if (person !== null) {
                    this.loginStateService.setPerson(person);
                    this.close();
                }
            })
            .catch((error) => {
                this.loginFailedMessage = "Email address or password is incorrect";
                console.error("error occurred", error)
            });
    }

    forgotPassword() {
        this.windowStateService.setIsWindowVisible("login", false);
        this.windowStateService.setIsWindowVisible("forgotPassword", true);
    }

    checkAllowLogin(): boolean {
        this.allowLogin = this.emailValue !== "" && this.password !== "";
        return this.allowLogin;
    }
}