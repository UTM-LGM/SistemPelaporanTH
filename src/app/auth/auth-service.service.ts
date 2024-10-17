import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { employees } from '../models/employees.model';
import { userDTO } from '../models/userDTO.model';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loggedInSource = new BehaviorSubject(false);
  currentLoggedIn = this.loggedInSource.asObservable();

  private emailSource = new BehaviorSubject<string | null>(null);
  currentEmail = this.emailSource.asObservable();

  constructor(private httpClient : HttpClient, private msalService: MsalService) { }

  getUserEmail(): string | null {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      const userEmail = this.decodeIdToken(accounts[0].idToken); // Decode token and get email
      return userEmail;
    }
    return null;
  }

  private decodeIdToken(token: string): string {
    const decodedToken: any = jwtDecode(token);
    return decodedToken.preferred_username;
  }
  
  setUserEmail(email) {
    this.emailSource.next(email);
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedInSource.next(loggedIn);
  }

  initialize() {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      const email = accounts[0].username;
      this.setUserEmail(email);
      this.setLoggedIn(true);
    }
  }
}

