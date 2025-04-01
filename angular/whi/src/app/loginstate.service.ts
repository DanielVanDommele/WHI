// counter.service.ts
import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class LoginStateService {
  // Create a signal with initial value
  private isLoggedIn = signal<boolean>(false);
  private loginName = signal<string>('');

  getIsLoggedIn(): boolean {
    // Update signal value
    return this.isLoggedIn();
  }

  getLoginUserName(): string {
    return this.loginName();
  }

  login(name: string) {
    this.isLoggedIn.update(() => true);
    this.loginName.update(() => name);
  }

  logout() {
    this.isLoggedIn.update(() => false);
    this.loginName.update(() => '');
  }
}
