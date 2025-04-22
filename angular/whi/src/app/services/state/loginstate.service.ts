import { Injectable, signal } from '@angular/core';
import { Person } from '../../../entity/person.entity';

@Injectable({
  providedIn: 'root'
})
export default class LoginStateService {
  // Create a signal with initial value
  private isLoggedIn = signal<boolean>(false);
  private loginName = signal<string>('');
  private signupFinished = signal<boolean>(false);
  private personData = signal<Person|null>(null);
  private sessionId = signal<string|null>(null);

  getIsLoggedIn(): boolean {
    // Update signal value
    return this.isLoggedIn();
  }

  getLoginUserName(): string {
    return this.loginName();
  }

  getSignupFinished(): boolean {
    return this.signupFinished();
  }

  getPerson(): Person|null {
    return this.personData();
  }

  getSessionId(): string|null {
    return this.sessionId();
  }

  setSignupFinished() {
    this.signupFinished.update(() => true);
  }

  setPerson(person: Person|null) {
    this.personData.update(() => person);
  }

  login(name: string, sessionId: string) {
    this.isLoggedIn.update(() => true);
    this.loginName.update(() => name);
    this.sessionId.update(() => sessionId);
  }

  logout() {
    this.isLoggedIn.update(() => false);
    this.loginName.update(() => '');
    this.sessionId.update(() => null);
  }
}
