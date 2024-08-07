import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerticalNavbarComponent } from './vertical-navbar/vertical-navbar.component';
import { TugasanHarianModule } from './tugas-harian/tugasan-harian.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeMs from '@angular/common/locales/ms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotisPadamComponent } from './dialogbox/notis-padam/notis-padam.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ExistDataComponent } from './dialogbox/exist-data/exist-data.component';
import { ExistDataHantarComponent } from './dialogbox/exist-data-hantar/exist-data-hantar.component';
import { ExistDrafComponent } from './dialogbox/exist-draf/exist-draf.component';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { SafeHtmlPipe } from './tugas-harian/safe-html.pipe';

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;


registerLocaleData(localeMs, 'ms');

@NgModule({
  declarations: [
    AppComponent,
    VerticalNavbarComponent,
    NotisPadamComponent,
    ExistDataComponent,
    ExistDataHantarComponent,
    ExistDrafComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TugasanHarianModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MsalModule.forRoot( 
      new PublicClientApplication({ 
        auth: { 
          //clientId: "2c5e5f1f-1ede-413f-a396-a2f7e103de3c",//PRODUCTION
          clientId: "0dfc7581-14e8-4e01-bdb7-da82b5027f7f", //LOCAL
          authority:  "https://login.microsoftonline.com/22f0712b-5def-4d21-a16e-30e5e334541e",
          redirectUri: "http://localhost:4200/login", 
          //redirectUri: 'https://www5.lgm.gov.my/PelaporanTugasHarian/login'
        }, 
        cache: {
          cacheLocation: BrowserCacheLocation.LocalStorage, 
          storeAuthStateInCookie: isIE, 
        }, 
      }), 
      { 
        interactionType: InteractionType.Redirect,
        authRequest: { 
          scopes: ["api://542a2ac7-84c9-4445-bd6e-bd940e64d609/Admin.Read"], 
        }, 
      }, 
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([ 
          ["https://graph.microsoft.com/User.Read", ["User.Read"]], 
        ]),
      } ,
      ),
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass: MsalInterceptor,multi: true
    },
    {
      provide:HTTP_INTERCEPTORS,useClass: TokenInterceptor,multi: true
    },
    MsalGuard, 
    DatePipe,
    { provide: LOCALE_ID, useValue: 'ms' }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
