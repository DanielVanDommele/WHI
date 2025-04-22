import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import UserEmailAddressField from "./fields/userEmailAdressField.component";
import UserPasswordField from "./fields/userPasswordField.component";

// 
@Component({
    selector: 'SignupUserDataForm',
    imports: [CommonModule, UserEmailAddressField, UserPasswordField],
    template: `<div [id]="getFormId" [ngClass]="{ 'user-data-form': true, hidden: !visible}">
      <div class="info-text">Now please provide your email address and a password</div>
      <UserEmailAddressField (changedValue)="onChangedEmail($event)" (isValid)="onIsEmailValid($event)" />
      <UserPasswordField (changedValue)="onChangedPassword($event)" (isValid)="onIsPasswordValid($event)" />
    </div>`,
    styles: `
        .user-data-form {
            overflow: auto;
            padding: 8px;
            width: 600px;
            height: 500px;
        }

        .info-text {
            display: block;
            padding: 4px 8px 0px;
        }

        .hidden {
            display: none;
        }
    `
})
export default class SignupUserDataForm {
  @Input("visible") visible = false;
  @Output("formDataUpdated") formDataUpdatedEvent = new EventEmitter<void>();

  formId: string = `frm_${crypto.randomUUID()}`;

  email: string = "";
  emailValid: boolean = false;
  password: string = "";
  passwordValid: boolean = false;

  constructor() {
    if (!this.visible) {
        document.getElementById(this.formId)?.classList.add("hidden");
    }
  }

  getFormId(): string {
    return this.formId;
  }

  isVisible(): boolean {
    return this.visible;
  }
  
  setVisible(value: boolean) {
    this.visible = value;
    if (value === true) {
      document.getElementById(this.formId)?.classList.remove("hidden");
    } else {
      document.getElementById(this.formId)?.classList.add("hidden");
    }
  }

  onChangedEmail(value: string) {
    this.email = value;
    this.formDataUpdatedEvent.emit();
  }

  onChangedPassword(value: string) {
    this.password = value;
    this.formDataUpdatedEvent.emit();
  }

  onIsPasswordValid(value: boolean) {
    this.passwordValid = value;
  }

  onIsEmailValid(value: boolean) {
    this.emailValid = value;
  }

  isFormFilledIn(): boolean {
    return this.email !== "" &&
           this.emailValid &&
           this.password !== "" &&
           this.passwordValid;
  }
}