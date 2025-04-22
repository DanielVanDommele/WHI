import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import PersonNameField from "./fields/personNameField.component";
import PersonDescriptionField from "./fields/personDescriptionField.component";
import PersonGenderField from "./fields/personGenderField.component";
import PersonBirthDateField from "./fields/personBirthDateField.component";
import PersonAvatarField from "./fields/personAvatar.component";

@Component({
    selector: 'SignupPersonDataForm',
    imports: [CommonModule, PersonNameField, PersonDescriptionField, PersonGenderField, PersonBirthDateField, PersonAvatarField],
    template: `<div [id]="getFormId" [ngClass]="{'person-data-form': true, hidden: !visible}">
        <div class="info-text">Hi, nice to see you wishing to create an account. Please start by entering some personal information:</div>
        <PersonNameField (changedValue)="onChangedName($event)" />
        <PersonGenderField (changedValue)="onChangedGender($event)" />
        <PersonBirthDateField (changedValue)="onChangedBirthDate($event)" />
        <PersonDescriptionField (changedValue)="onChangedDescription($event)" />
        <PersonAvatarField (changedValue)="onChangedAvatar($event)" />
    </div>`,
    styles: `
        .person-data-form {
            overflow: none;
            padding: 0px;
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
export default class SignupPersonDataForm implements AfterViewInit {
  @Input("visible") visible = false;
  @Output("formDataUpdated") formDataUpdatedEvent = new EventEmitter<void>();
  @ViewChild(PersonAvatarField)  personAvatarField ?: PersonAvatarField|null;

  name: string = '';
  description: string = '';
  gender: number = 2;
  birthDate: number = 0;
  avatar: string = '';

  formId: string = `frm_${crypto.randomUUID()}`;

  constructor() {
    if (!this.visible) {
        document.getElementById(this.formId)?.classList.add("hidden");
    }
  }

  ngAfterViewInit(): void {
    // child is set
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

  isFormFilledIn(): boolean {
    return this.name !== '' &&
           this.description !== '' &&
           (this.gender >= 0 && this.gender <= 2) &&
           this.birthDate > 0;
  }

  onChangedName(value: string) {
    this.name = value;
    this.personAvatarField?.updateName(value);
    this.formDataUpdatedEvent.emit();
  }

  onChangedDescription(value: string) {
    this.description = value;
    this.formDataUpdatedEvent.emit();
  }

  onChangedGender(value: number) {
    this.gender = value;
    this.formDataUpdatedEvent.emit();
  }

  onChangedBirthDate(value: number) {
    this.birthDate = value;
    this.formDataUpdatedEvent.emit();
  }

  onChangedAvatar(value: string) {
    this.avatar = value;
    this.formDataUpdatedEvent.emit();
  }
}