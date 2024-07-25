import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { RedirectRequest } from '@azure/msal-browser';
import { AuthServiceService } from '../auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig:MsalGuardConfiguration,  
    private msalService: MsalService,
    private router: Router, 
    private authService: AuthServiceService
  ) { }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  loginSSO(){ 
    this.isLoading = true;
  if (this.msalGuardConfig.authRequest){ 
    this.msalService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest); 
  } else { 
    this.msalService.loginRedirect(); 
    }  
  } 

  checkAuthentication() { 
    this.isLoading = true;
    this.msalService.handleRedirectObservable().subscribe({
      next: () => { 
        const accounts = this.msalService.instance.getAllAccounts(); 
        if (accounts.length > 0) { 
          this.router.navigateByUrl('/sistemPelaporanTH');
          this.isLoading = false; 
        } else { 
          this.router.navigateByUrl('/login');
          this.isLoading = false; 
        } 
      }, 
      error: (err) => { 
        localStorage.clear();
        this.isLoading = false; 
      }
    });
  }

  getUserEmail(): string | null {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0 && typeof accounts[0].idToken === 'string') {
      const userEmail = this.authService.decodeIdToken(accounts[0].idToken); // Decode token and get email
      console.log("email",userEmail)
      return userEmail;
    }
    return null;
  }
      

}
