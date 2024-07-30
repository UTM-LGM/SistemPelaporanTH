import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { jwtDecode } from "jwt-decode";
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private msalService: MsalService
  ) { }

  canActivate(): boolean {
    this.setAccessToken(); // Call setAccessToken here
    return true
    let permitted;
    
    this.authService.currentLoggedIn.subscribe(res => {
      permitted = res
      //console.log("permitted")
    });
    if (permitted) {
      return true;
    }
 
    this.router.navigate(['']);
    return false;
  }

  setAccessToken() {
    // Entra Id
    //const clientId = '2c5e5f1f-1ede-413f-a396-a2f7e103de3c'; //PRODUCTION
    const clientId = '0dfc7581-14e8-4e01-bdb7-da82b5027f7f'; //LOCAL
 
    const tokenInfoString = localStorage.getItem(`msal.token.keys.${clientId}`);
    //console.log("tokeninfo", tokenInfoString)
    if (tokenInfoString !== null) {
      const tokenInfo = JSON.parse(tokenInfoString);
      if (tokenInfo.accessToken) {
        this.setIdToken(tokenInfo)
        const accessToken = tokenInfo.accessToken[0];
        const secret = localStorage.getItem(accessToken);
        //console.log(secret);
        if (secret !== null) {
          const secretInfo = JSON.parse(secret);
          //console.log(secretInfo.secret);
          localStorage.setItem('accessToken', secretInfo.secret);
          this.decodeAccessToken();
        }
      }
    }
  }

  setIdToken(tokenInfo: any) {
    if (tokenInfo.idToken) {
      const idToken = tokenInfo.idToken[0];
      const secret = localStorage.getItem(idToken);
      //console.log(secret);
      if (secret !== null) {
        const secretInfo = JSON.parse(secret);
        //console.log(secretInfo.secret);
        localStorage.setItem('idToken', secretInfo.secret);
        this.decodeIdToken(secretInfo.secret)
      }
    }
  }

  // Function to decode token and extract email
  decodeAccessToken() {
    const token = localStorage.getItem('accessToken')
    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      //console.log("accessToken", decodedToken)
 
 
      //check jwt expired time
      const currentTime = new Date().getTime()
      //*1000 to convert milisecond
      if (decodedToken.exp * 1000 < currentTime) {
        this.msalService.logoutRedirect({
           postLogoutRedirectUri: 'http://localhost:4200/login'
           //postLogoutRedirectUri: 'https://www5.lgm.gov.my/PelaporanTugasHarian/login'
        });
        localStorage.clear()
        this.router.navigateByUrl('/login')
        return false
      }
      else {
        return true
      }
    }
    return true
 
  }

  decodeIdToken(token: string) {
    //const token = localStorage.getItem('idToken')
    if (token != null) {
      const decodedToken: any = jwtDecode(token)
      const email = decodedToken.preferred_username;
      //console.log("idToken", decodedToken)
      this.authService.setEmail(email);
      console.log("AD", email)
      return email;
    }
  }
}

