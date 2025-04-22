import { Component, EventEmitter, Output } from "@angular/core";
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { Input } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ButtonModule } from "primeng/button";

@Component({
    selector: 'PersonAvatarField',
    imports: [FileUploadModule, AvatarModule, ButtonModule],
    template: `<div class="person-avatar-field-outer">
        <label>You can upload a small picture for your avatar or use the generated one: </label>
        <div class="avatar-component-container">
            <div class="file-upload-container">
                <p-fileupload mode="basic" name="avatarImageUploader" [auto]="true" [customUpload]="true" chooseLabel="Select image" chooseIcon="pi pi-upload" accept="image/*" (uploadHandler)="onAvatarUpload($event)" />
            </div>
            <div class="file-upload-container">
                <p-button label="Remove image" class="form-button" icon="pi pi-times" (onClick)="removeImage()" />
            </div>
            <div class="spacer"></div>
            <div class="avatar-container">
                @if (isImageUploaded) {
                    <p-avatar [image]="getValue()" styleClass="mr-2" [style]="{ border: '1px solid #3F3F3F'}" size="xlarge" shape="circle" />
                }
                @else {
                    <p-avatar [label]="getInitials()" styleClass="mr-2" [style]="getLabelAvatarStyle()" size="xlarge" shape="circle" />
                }
            </div>
        </div>
    </div>`,
    styles: `
    .person-avatar-field-outer {
        display: flex;
        flex: 1;
        flex-flow: column nowrap;
        padding: 4px 8px;
    }

    .avatar-component-container {
        flex: 1;
        display: flex;
        flex-flow: row nowrap;
    }

    .file-upload-container {
        width: 180px;
        display: flex;
        flex-flow: column nowrap;
        padding: 4px 0px;
    }

    .spacer {
        flex: 1;
    }

    .avatar-container {
        width: 80px;
        padding: 8px;
    }
    `
})
export default class PersonAvatarField {
   @Input("personName") personName = '';
   @Output('changedValue') changedValueEvent = new EventEmitter<string>();

    avatarValue: string = '';
    isImageUploaded: boolean = false;
    selectedBackground: string = '';

    constructor() {
        this.selectedBackground = "hsl(" + 360 * Math.random() + ',' +
        (25 + 70 * Math.random()) + '%,' + 
        (85 + 10 * Math.random()) + '%)'
    }

    getInitials(): string {
        return this.personName.split(' ').map((nameFragment) => this.#getCharIfUppercase(nameFragment)).join('');
    }

    #getCharIfUppercase(str: string) {
        return /[A-Z]/.test(str.charAt(0)) ? str.charAt(0) : '';
    }

    getLabelAvatarStyle() {
        return { background: this.selectedBackground, border: '1px solid #3f3f3f' };
    }

    getValue(): string {
        if (this.isImageUploaded) {
            return this.avatarValue;
        } else {
            return `[${this.selectedBackground},${this.getInitials}]`;
        }   
    }

    updateName(name: string) {
        this.personName = name;
    }

    async onAvatarUpload(event: FileUploadHandlerEvent) {
        function convertBase64 (file: File): Promise<string> {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
          
                fileReader.onload = () => {
                    if (fileReader.result === null) {
                        console.warn('result of upload was null');
                    }
                    if (typeof fileReader.result === 'string') {
                        resolve(fileReader.result);
                    } else if (fileReader.result instanceof ArrayBuffer) {
                        // convert to string
                        const decoder = new TextDecoder();
                        resolve(decoder.decode(fileReader.result));
                    }
                };
          
                fileReader.onerror = (error) => {
                    reject(error);
                };
            });
        };

        const file: File = event.files[0];
        const base64: string = await convertBase64(file);
        this.avatarValue = base64;
        this.isImageUploaded = true; 
        this.#emitEvent();
   }

   removeImage() {
        this.avatarValue = '';
        this.isImageUploaded = false;
        this.#emitEvent();
   }

   #emitEvent() {
        this.changedValueEvent.emit(this.getValue());
   }
}
