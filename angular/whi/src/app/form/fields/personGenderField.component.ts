import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'PersonGenderField',
    imports: [FormsModule, SelectModule],
    template: `<div class="person-gender-field-outer">
        <label>What is your gender? </label>
        <p-select [options]="genders" name="personGender" (onChange)="onChange()" [(ngModel)]="genderValue" optionLabel="text" optionValue="value" />
    </div>`,
    styles: `
    .person-gender-field-outer {
        display: block;
        padding: 4px 8px;
    }

    .dropdown {
        border: 1px solid #09a2e4;
        width: 140px;
    }
    `
})
export default class PersonGenderField {
    @Output('changedValue') changedValueEvent = new EventEmitter<number>();

    genderValue: number = 2;
    genders = [
        {value: 0, text: "Male"},
        {value: 1, text: "Female"},
        {value: 2, text: "Unknown"}
    ];

    onChange() {
        this.changedValueEvent.emit(this.genderValue);
    }

    getValue(): number {
        return this.genderValue;
    }
}
