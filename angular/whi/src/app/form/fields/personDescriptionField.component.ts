import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'PersonDescriptionField',
    imports: [FormsModule, TextareaModule],
    template: `<div class="person-description-field-outer">
        <label>Can you give some details about yourself?</label>
        <textarea type="text" name="personDescription" pTextArea rows="5" cols="74" class="text-field" (change)="onChange()" [(ngModel)]="descriptionValue"></textarea> 
    </div>`,
    styles: `
    .person-description-field-outer {
        display: block;
        padding: 4px 8px;
    }

    .text-field {
        border: 1px solid #09a2e4;
    }
    `
})
export default class PersonDescriptionField {
    descriptionValue: string = '';

    @Output('changedValue') changedValueEvent = new EventEmitter<string>();
    
    onChange() {
        this.changedValueEvent.emit(this.descriptionValue);
    }

    getValue(): string {
        return this.descriptionValue;
    }
}
