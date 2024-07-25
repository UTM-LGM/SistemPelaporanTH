import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TambahTugasHarianComponent } from './tugas-harian/tambah-tugas-harian/tambah-tugas-harian.component';
import { MsalGuard } from '@azure/msal-angular';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { BrowserUtils } from '@azure/msal-browser';


const routes: Routes = [
  { path: 'sistemPelaporanTH', component:TambahTugasHarianComponent, canActivate:[MsalGuard,AuthGuardService] } ,
  { path: '', redirectTo: 'sistemPelaporanTH', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      initialNavigation: 
      !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() 
      ? "enabled" 
      : "disabled",
      }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
