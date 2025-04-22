import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DatePickerModule } from  'primeng/datepicker';

@Component({
    selector: 'PersonBirthDateField',
    imports: [FormsModule, DatePickerModule],
    template: `<div class="person-birthdate-field-outer">
        <label>What is your birth date? </label>
        <p-datepicker (onInput)="onChange()" (onSelect)="onChange()" [(ngModel)]="birthDateValue" [iconDisplay]="'input'" [showIcon]="true" inputId="icondisplay" />
    </div>`,
    styles: `
    .person-birthdate-field-outer {
        display: block;
        padding: 8px 8px 8px;
    }
    `
})
export default class PersonBirthDateField {
    birthDateValue: Date | null = null;
 
    @Output('changedValue') changedValueEvent = new EventEmitter<number>();

    onChange() {
        if (this.birthDateValue instanceof Date) {
            this.changedValueEvent.emit(this.birthDateValue.getTime());
        }
    }

    getValue(): number {
        return this.birthDateValue?.getTime() ?? 0;
    }
}
