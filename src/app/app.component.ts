import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading: boolean = false;
  title = 'SistemPelaporanTugasanHarian';

  constructor(
    private msalService: MsalService,
  ) {}

  isAuthenticated(): boolean {
    const accounts = this.msalService.instance.getAllAccounts();
    return accounts.length > 0;
  }
  
  logOut() { 

    this.msalService.logoutRedirect({ 
      postLogoutRedirectUri: 'http://localhost:4200/login' 
    }); 
     localStorage.clear();  

 } 
 
}
