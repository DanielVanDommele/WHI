import { inject, Injectable } from "@angular/core";
import { RelationType } from "../enums/relationType.enum";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable } from "rxjs";

import { environment } from "../../environments/environment";

import LoginStateService from "./state/loginstate.service";
import { Person } from "../../entity/person.entity";

@Injectable({
  providedIn: 'root'
})
export default class LoginRequestService {
    baseUrl: string = `${environment.apiUrl}/`;

    loginStateService = inject(LoginStateService);

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string): Promise<Person|null> {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.baseUrl}user/login`, {
                email,
                password
            })
                .pipe(
                    catchError((error) => {
                        reject(null);
                        console.error(error);
                        return new Observable();
                    })
                )
                .subscribe((data: any) => {
                    this.http.get(`${this.baseUrl}person/${data.personId}`, { headers: { sess: data.sessionid }})
                        .pipe(
                            catchError((error) => {
                                reject(null);
                                console.error(error);
                                return new Observable();
                            })
                        )
                        .subscribe((person: any) => {
                            this.loginStateService.login(person?.name, data.sessionid);
                            resolve(person);
                        })
                })
            });
    }

    logout() {
        this.http.post(`${this.baseUrl}user/logout`, null, { headers: { sess: this.loginStateService.getSessionId() ?? "" }})
        .subscribe(() => {
            this.loginStateService.logout();
        });
    }
}