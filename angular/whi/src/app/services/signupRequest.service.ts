import { inject, Injectable } from "@angular/core";
import { RelationType } from "../enums/relationType.enum";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable } from "rxjs";

import { environment } from "../../environments/environment";

import LoginStateService from "./state/loginstate.service";

@Injectable({
  providedIn: 'root'
})
export default class SignupRequestService {
    baseUrl: string = `${environment.apiUrl}/`;

    loginStateService = inject(LoginStateService);

    constructor(private http: HttpClient) {
    }

    sendSignupData(name: string, description: string, gender: number, birthDate: number, avatar: string, email: string, password: string): Promise<boolean> {
        const personId = crypto.randomUUID();
        const userId = crypto.randomUUID();
        const person = {
            id: personId,
            name: name,
            gender: gender,
            birthDate: birthDate,
            birthPlace: null,
            description: description,
            relationType: RelationType.Self,
            avatar: avatar
        };

        const user = {
            id: userId,
            personId: personId,
            // "active" is filled in for completeness of the entity, but will be ignored by backend. 
            // Create User will always start with the user being inactive, so no steps can be omitted.
            active: false,
            email: email,
            password: password,
            lastLogin: 0
        };

        const signupData = {
            person,
            user,
            url: environment
        }

        return new Promise((resolve, reject) => {
            this.http.post(`${this.baseUrl}signup`, signupData)
                .pipe(
                    catchError((error) => {
                        reject(false);
                        return new Observable();
                    })
                )
                .subscribe((data: any) => {
                    resolve(true);
                })
            });
    }

    sendNonce(urlSuffix: string) {
        this.http.get(`${this.baseUrl}/${urlSuffix}`).subscribe(() => {
            if (urlSuffix.includes("signup")) {
                this.loginStateService.setSignupFinished();
            }
        })
    }
}