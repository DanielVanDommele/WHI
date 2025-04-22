import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PasswordModule } from 'primeng/password';

@Component({
    selector: 'UserPasswordField',
    imports: [FormsModule, PasswordModule],
    template: `<div class="user-password-field-outer">
        <div class="password-container">
            <label>Create a password that is at least 8 characters long and contains at least one uppercase character, at least one lowercase alphabetic characters, at least one numeric character and at least one special character:</label>
            <p-password [(ngModel)]="password" autocomplete="off" [style]="{'width': '100%'}" [inputStyle]="{'width': '100%'}" (onBlur)="afterInputPassword()">
                <ng-template #footer>
                    <ul class="pl-2 ml-2 my-0 leading-normal">
                        <li>At least one lowercase</li>
                        <li>At least one uppercase</li>
                        <li>At least one numeric</li>
                        <li>At least one special character</li>
                        <li>Minimum 8 characters</li>
                    </ul>
                </ng-template>
            </p-password>
        </div>
        <div class="password-container">
            <label>Repeat the password:</label><br />
            <p-password [(ngModel)]="repeatPassword" autocomplete="off" [style]="{'width': '100%'}" [inputStyle]="{'width': '100%'}" (onBlur)="afterInputRepeatPassword()" />
        </div>
        @if(password !== '' && repeatPassword !== '') {
            @if (isPasswordValid) {
                <div class="password-message ok">{{ passwordMessage }}</div>
            }
            @else {
                <div class="password-message nok">{{ passwordMessage }}</div>
            }
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

    .password-container,
    .password-message {
        padding: 8px 8px;
    }

    .ok {
        color: #00A200;
    }

    .nok {
        color: #A20000;
    }
    `
})
export default class UserPasswordField {
    @Output("changedValue") changedValueEvent = new EventEmitter<string>();
    @Output("isValid") isPasswordValidEvent = new EventEmitter<boolean>();

    password: string = "";
    repeatPassword: string = "";
    passwordMessage: string = "";
    isPasswordValid: boolean = false;

    #validatePassword(pwd: string): boolean {
        return pwd.length >= 8 &&
               /.*[A-Z].*/.test(pwd) &&
               /.*[a-z].*/.test(pwd) &&
               /.*[0-9].*/.test(pwd) &&
               /.*[!@#$%^&*\(\)\{\}\|\[\]\\~`:;"'<,>.\?\/].*/.test(pwd);
    }

    #onPasswordChange(password: string) {
        if (this.#validatePassword(password) &&
            this.password === this.repeatPassword) {
            
            this.passwordMessage = "Your password is valid.";
            this.isPasswordValidEvent.emit(true);
            this.isPasswordValid = true;
            this.changedValueEvent.emit(this.password);
        } else {
            this.passwordMessage = "Your password does not meet all requirements or the repeat password field does not match the password field";
            this.isPasswordValid = false;
            this.isPasswordValidEvent.emit(false);
        }
    }

    afterInputPassword() {
        this.#onPasswordChange(this.password);
    }

    afterInputRepeatPassword() {
        this.#onPasswordChange(this.password);
    }

    getValue(): string {
        return this.password;
    }
}
