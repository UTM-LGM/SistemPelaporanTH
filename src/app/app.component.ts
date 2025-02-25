import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { TugasanHarianService } from './tugas-harian/tugasan-harian.service';
import { employees } from './models/employees.model';
import { AuthServiceService } from './auth/auth-service.service';
import { unit } from './models/unit.model';
import { userDTO } from './models/userDTO.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  isLoading: boolean = false;
  title = 'SistemPelaporanTugasanHarian';
  currentUser: employees = {} as employees;
  employees: employees[] = [];
  units: unit[] = [];

  constructor(
    private msalService: MsalService,
    private authService: AuthServiceService,
    private laporanTugas: TugasanHarianService

  ) { }

  ngOnInit(): void {
    this.authService.initialize();
    this.authService.currentLoggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        this.authService.currentEmail.subscribe(email => {
          if (email) {
            this.currentUser.empEmailLogin = email
            this.loadUserData();
          }
        });
      }
    });
  }

  loadUserData() {
    this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
      this.currentUser = res;
      this.laporanTugas.getSenaraiKakitangan(this.currentUser.empId).subscribe(staff => {
        this.employees = staff;
      });
      this.laporanTugas.getSenaraiPelulus(this.currentUser.empId).subscribe(lulus => {
        this.employees = lulus;
      });
      this.laporanTugas.getUnitKU(this.currentUser.empId).subscribe(unit => {
        this.units = unit
      });
    });
  }

  isAuthenticated(): boolean {
    const accounts = this.msalService.instance.getAllAccounts();
    return accounts.length > 0;
  }

  logOut() {
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200/login'
      //postLogoutRedirectUri: 'https://www5.lgm.gov.my/PelaporanTugasHarian/login'
    });
    localStorage.clear();
  }

  subNavOpen = {
    laporan: false
  };

  toggleSubNav(menu: string) {
    this.subNavOpen[menu] = !this.subNavOpen[menu];
  }

}
