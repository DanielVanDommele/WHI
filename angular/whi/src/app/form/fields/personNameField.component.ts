import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'PersonNameField',
    imports: [FormsModule, InputTextModule],
    template: `<div class="person-name-field-outer">
        <label>What is your full name? </label>
        <input type="text" size="60" pInputText name="personDescription" class="text-field" (change)="onChange($event)" [(ngModel)]="nameValue" /> 
    </div>`,
    styles: `
    .person-name-field-outer {
        display: block;
        padding: 8px 8px 4px;
    }

    .text-field {
        border: 1px solid #09a2e4;
    }
    `
})
export default class PersonNameField {
    nameValue: string = '';

    @Output('changedValue') changedValueEvent = new EventEmitter<string>();

    onChange(event: any) {
        this.changedValueEvent.emit(this.nameValue);
    }

    getValue(): string {
        return this.nameValue;
    }
}
