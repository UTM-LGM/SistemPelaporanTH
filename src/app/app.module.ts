import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerticalNavbarComponent } from './vertical-navbar/vertical-navbar.component';
import { TugasanHarianModule } from './tugas-harian/tugasan-harian.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeMs from '@angular/common/locales/ms';
import { HttpClientModule } from '@angular/common/http';
import { NotisPadamComponent } from './dialogbox/notis-padam/notis-padam.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ExistDataComponent } from './dialogbox/exist-data/exist-data.component';
import { ExistDataHantarComponent } from './dialogbox/exist-data-hantar/exist-data-hantar.component';

registerLocaleData(localeMs, 'ms');

@NgModule({
  declarations: [
    AppComponent,
    VerticalNavbarComponent,
    NotisPadamComponent,
    ExistDataComponent,
    ExistDataHantarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TugasanHarianModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'ms' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
