import { AfterViewInit, Component, Inject, inject, ViewChild } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { ToastModule } from 'primeng/toast';
import { MessageService } from "primeng/api";

import SignupPersonDataForm from "../form/signupPersonDataForm.component";
import SignupUserDataForm from "../form/signupUserDataForm.component";
import WindowStateService from "../services/state/windowstate.service";
import SignupRequestService from "../services/signupRequest.service";

@Component({
    selector: 'SignupWindow',
    imports: [
        SignupPersonDataForm,
        SignupUserDataForm,
        ButtonModule,
        ToastModule
    ],
    template: `<div class="signup-window">
        <div class="title-bar">Sign up</div>
        <div class="form-area">
            <SignupPersonDataForm [visible]="true" (formDataUpdated)="onPersonDataUpdated()" />
            <SignupUserDataForm [visible]="false" (formDataUpdated)="onUserDataUpdated()" />
        </div>
        <div class="button-area">
            @if (currentPageIndex > 1) {
                <p-button label="Previous" class="form-button" icon="pi pi-chevron-left" (onClick)="previous()" />
            }
            @if (currentPageIndex < maxPages) {
                <p-button label="Next" class="form-button" icon="pi pi-chevron-right" [disabled]="!personDataFilledIn" (onClick)="next()" />
            }
            @if (currentPageIndex === maxPages) {
                <p-button label="Finish" class="form-button" icon="pi pi-check" [disabled]="!userDataFilledIn" (onClick)="finish()" />
            }
            <p-button label="Cancel" class="form-button" icon="pi pi-times" (onClick)="close()" />
        </div>
        <p-toast position="center" />
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

        .signup-window {
            display: flex;
            flex-flow: column nowrap;
            align-items: stretch;
            border: 2px solid #09a2e4;
            background: #FFFFFF;
            padding: 0px;
            width: 600px;
            height: 540px;
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
            height: 450px;
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
export default class SignupWindow implements AfterViewInit {
    currentPageIndex: number = 1;
    maxPages: number = 2;

    personDataFilledIn: boolean = false;
    userDataFilledIn: boolean = false;

    @ViewChild(SignupPersonDataForm) personData?: SignupPersonDataForm|null;
    @ViewChild(SignupUserDataForm) userData?: SignupUserDataForm|null;

    signupRequestService: SignupRequestService = inject(SignupRequestService);
    windowStateService: WindowStateService = inject(WindowStateService);
    messageService: MessageService = inject(MessageService);

    constructor() {
        //
    }

    ngAfterViewInit() {
        // child is set (so they say)
    }

    #showSpecificForm() {
        switch (this.currentPageIndex) {
            case 1:
                this.personData?.setVisible(true);
                this.userData?.setVisible(false);
                break;
            case 2:
                this.userData?.setVisible(true);
                this.personData?.setVisible(false);
                break;
        }
    }

    onPersonDataUpdated() {
        this.personDataFilledIn = this.personData?.isFormFilledIn() ?? false;
    }

    onUserDataUpdated() {
        this.userDataFilledIn = this.userData?.isFormFilledIn() ?? false;
    }

    previous() {
        if (this.currentPageIndex > 1) {
            this.currentPageIndex--;
            this.#showSpecificForm();
        }
    }

    next() {
        if (this.currentPageIndex < this.maxPages) {
            this.currentPageIndex++;
            this.#showSpecificForm();
        }
    }

    close() {
        this.windowStateService.setIsWindowVisible("signup", false);
    }

    finish() {
        if (this.personData && this.userData) {
            this.signupRequestService.sendSignupData(
                this.personData.name,
                this.personData.description,
                this.personData.gender,
                this.personData.birthDate,
                this.personData.avatar,
                this.userData.email,
                this.userData.password)
                .then(() => this.#onSuccesfulSignup())
                .catch((error) => this.#onFailedSignup(error));
        }
    }

    #onSuccesfulSignup() {
        this.messageService.add({ severity: "success", summary: "Sign up", detail: "You have succesfully created account. You can now login and start logging your whereabouts." });
        this.close();
    }

    #onFailedSignup(error: any) {
        this.messageService.add({ severity: "error", summary: "Sign up", detail: "Your data could not be processed. Please try again." });
    }
}