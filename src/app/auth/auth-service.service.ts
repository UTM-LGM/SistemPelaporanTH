import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { employees } from '../models/employees.model';
import { userDTO } from '../models/userDTO.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loggedInSource = new BehaviorSubject(false);
  currentLoggedIn = this.loggedInSource.asObservable();

  private emailSource = new BehaviorSubject<string | null>(null);
  currentEmail = this.emailSource.asObservable();

  constructor(
    private httpClient: HttpClient,
    private msalService: MsalService
  ) {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      this.emailSource.next(storedEmail);
    }
  }

  setEmail(email: string) {
    localStorage.setItem('email', email);
    this.emailSource.next(email);
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedInSource.next(loggedIn);
  }

  initialize() {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      const email = accounts[0].username;
      this.setEmail(email);
      this.setLoggedIn(true);
    }
  }

}
