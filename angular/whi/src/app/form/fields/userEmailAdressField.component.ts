import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'UserEmailAddressField',
    imports: [FormsModule, InputTextModule],
    template: `<div class="user-email-address-field-outer">
        <label>Enter your email address: </label>
        <input type="email" pInputText size="60" name="email" [(ngModel)]="emailValue" email="true" (change)="onChange($event)" />
        
        @if (isEmailValid) {
            <div class="email-message ok">{{ emailMessage }}</div>
        }
        @else {
            <div class="email-message nok">{{ emailMessage }}</div>
        }
    </div>`,
    styles: `
    .user-email-address-field-outer {
        display: block;
        padding: 8px 8px 4px;
    }

    .text-field {
        border: 1px solid #09a2e4;
    }

    .email-message {
        padding: 8px 0px;
    }

    .ok {
        color: #00A200;
    }

    .nok {
        color: #A20000;
    }
    `
})
export default class UserEmailAddressField {
    @Output("changedValue") changedValueEvent = new EventEmitter<string>();
    @Output("isValid") isEmailValidEvent = new EventEmitter<boolean>();

    emailValue: string = "";
    emailMessage: string = "";
    isEmailValid: boolean = false;

    onChange(event: any) {
        if (this.#validateEmail()) {
            this.isEmailValid = true;
            this.emailMessage = "Your email address is valid";
            this.changedValueEvent.emit(this.emailValue);
            this.isEmailValidEvent.emit(this.isEmailValid);
        } else {
            this.isEmailValid = false;
            this.emailMessage = "This is not a valid email address";
            this.isEmailValidEvent.emit(this.isEmailValid);
        }
    }

    #validateEmail(): boolean {
        return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.emailValue);
    }

    getValue(): string {
        return this.emailValue;
    }
}
