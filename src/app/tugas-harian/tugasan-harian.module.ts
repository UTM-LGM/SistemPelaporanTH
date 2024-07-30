import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TugasanHarianRoutingModule } from './tugasan-harian-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { TambahTugasHarianComponent } from './tambah-tugas-harian/tambah-tugas-harian.component';
import { SenaraiDerafpembetulanComponent } from './senarai-derafpembetulan/senarai-derafpembetulan.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { KemaskiniTHComponent } from './kemaskini-th/kemaskini-th.component';
import { SenaraiLaporanTHIndividuComponent } from './senarai-laporan-th-individu/senarai-laporan-th-individu.component';
import { KelulusanTHComponent } from './kelulusan-th/kelulusan-th.component';
import { DetailLulusThComponent } from './detail-lulus-th/detail-lulus-th.component';
import { DetailLaporanIndividuComponent } from './detail-laporan-individu/detail-laporan-individu.component';
import { MatSelectModule } from '@angular/material/select';
import { LamanUtamaComponent } from './laman-utama/laman-utama.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SenaraiLaporanKeseluruhanComponent } from './senarai-laporan-keseluruhan/senarai-laporan-keseluruhan.component';

@NgModule({
  declarations: [
    TambahTugasHarianComponent,
    SenaraiDerafpembetulanComponent,
    KemaskiniTHComponent,
    SenaraiLaporanTHIndividuComponent,
    KelulusanTHComponent,
    DetailLulusThComponent,
    DetailLaporanIndividuComponent,
    LamanUtamaComponent,
    SenaraiLaporanKeseluruhanComponent
  ],
  imports: [
    CommonModule,
    TugasanHarianRoutingModule,
    AppRoutingModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    NgxMaterialTimepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ]
})
export class TugasanHarianModule { }
