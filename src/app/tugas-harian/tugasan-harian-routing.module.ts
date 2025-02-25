import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TambahTugasHarianComponent } from './tambah-tugas-harian/tambah-tugas-harian.component';
import { SenaraiDerafpembetulanComponent } from './senarai-derafpembetulan/senarai-derafpembetulan.component';
import { KemaskiniTHComponent } from './kemaskini-th/kemaskini-th.component';
import { SenaraiLaporanTHIndividuComponent } from './senarai-laporan-th-individu/senarai-laporan-th-individu.component';
import { KelulusanTHComponent } from './kelulusan-th/kelulusan-th.component';
import { DetailLulusThComponent } from './detail-lulus-th/detail-lulus-th.component';
import { DetailLaporanIndividuComponent } from './detail-laporan-individu/detail-laporan-individu.component';
import { LamanUtamaComponent } from './laman-utama/laman-utama.component';
import { SenaraiLaporanKeseluruhanComponent } from './senarai-laporan-keseluruhan/senarai-laporan-keseluruhan.component';
import { LaporanSemakSemasaComponent } from './laporan-semak-semasa/laporan-semak-semasa.component';
import { LaporanSemakKuComponent } from './laporan-semak-ku/laporan-semak-ku.component';


const routes: Routes = [
  { path: 'tambahTugasanHarian', component: TambahTugasHarianComponent },
  { path: 'kemaskiniTH/:id', component: KemaskiniTHComponent },
  { path: 'kelulusanTH/:id', component: DetailLulusThComponent },
  { path: 'laporanTHIndividu/:id', component: DetailLaporanIndividuComponent },
  { path: 'senaraiDeraf', component: SenaraiDerafpembetulanComponent },
  { path: 'senaraiLaporanIndividu', component: SenaraiLaporanTHIndividuComponent },
  { path: 'kelulusanTugasHarian', component: KelulusanTHComponent },
  { path: 'lamanUtama', component: LamanUtamaComponent },
  { path: 'senaraiLaporanKeseluruhan', component: SenaraiLaporanKeseluruhanComponent },
  { path: 'senaraiLaporanSemak', component: LaporanSemakSemasaComponent },
  { path: 'senaraiLaporanUnit', component: LaporanSemakKuComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TugasanHarianRoutingModule { }
