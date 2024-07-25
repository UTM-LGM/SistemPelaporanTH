import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { employees } from '../models/employees.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loggedInSource = new BehaviorSubject(false);
  currentLoggedIn = this.loggedInSource.asObservable();

  private userEmailSubject = new BehaviorSubject<employees>(new employees());
  userEmail$ = this.userEmailSubject.asObservable();
  
  constructor(
    private httpClient : HttpClient, 
    private msalService: MsalService
  ) { }

  getUserEmail(): string | null {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      const userEmail = this.decodeIdToken(accounts[0].idToken); // Decode token and get email
      return userEmail;
    }
    return null;
  }

  decodeIdToken(token: string): string {
    const decodedToken: any = jwtDecode(token);
    return decodedToken.preferred_username;
  }

  setUserEmail(email: employees) {
    this.userEmailSubject.next(email);
  }
}
