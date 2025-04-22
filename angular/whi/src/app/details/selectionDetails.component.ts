import { Component, inject } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import LoginStateService from '../services/state/loginstate.service';
import { Person } from '../../entity/person.entity';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'SelectionDetails',
  imports: [AvatarModule, ButtonModule],
  template: `<div class="selection-details">
      @if(personData?.avatar?.includes("data:image")) {
        <p-avatar [image]="getImage()" styleClass="mr-2" [style]="{ border: '1px solid #3F3F3F'}" size="xlarge" shape="circle" />
      }
      @else {
        <p-avatar [label]="getInitials()" styleClass="mr-2" [style]="{ border: '1px solid #3F3F3F'}" size="xlarge" shape="circle" />
      }
      <div class="person-name">{{personData?.name ?? ""}}</div>
      <br />
      <div class="person-relations">You have 0 related persons</div>
      <p-button class="button" label="Add person relation" />
      <p-button class="button" label="See all person relations" />
      <br />
      <br />
      <div class="person-presences">You have 0 recorded presences</div>
      <br />
      <div>
        You can right-click on the map to add a presence to that location
      </div>
  </div>`,
  styles: `
    :host, .selection-details {
      display: flex;
      flex-flow: column nowrap;
      flex: 1;
      align-items: center;
    }

    .button {
      margin: 4px;
    }
    
    .person-name {
      font-weight: bold;
      font-size: 18px;
    }`
})
export default class SelectionDetails {
    loginState = inject(LoginStateService);
    personData: Person|null = null;

    constructor() {
      this.personData = this.loginState.getPerson();
    }

    getInitials(): string {
      if (this.personData?.avatar) {
        const avatarValue = this.personData.avatar;
        if (!avatarValue.includes("data:image")) {
          return avatarValue.substring(avatarValue.indexOf(",") + 1, avatarValue.length - 1)
        }
      }

      return "";
    }

    getLabelAvatarStyle(): string {
      if (this.personData?.avatar) {
        const avatarValue = this.personData.avatar;
        if (!avatarValue.includes("data:image")) {
          return avatarValue.substring(1, avatarValue.indexOf(",") - 1)
        }
      }

      return "";
    }

    getImage(): string {
      return this.personData?.avatar?.toString() ?? "";
    }
}
