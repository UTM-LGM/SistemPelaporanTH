import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TambahTugasHarianComponent } from './tambah-tugas-harian/tambah-tugas-harian.component';
import { SenaraiDerafpembetulanComponent } from './senarai-derafpembetulan/senarai-derafpembetulan.component';
import { KemaskiniTHComponent } from './kemaskini-th/kemaskini-th.component';


const routes: Routes = [
  { path: 'tambahTugasanHarian', component: TambahTugasHarianComponent },
  { path: 'kemaskiniTH/:id', component: KemaskiniTHComponent },
  { path: 'senaraiDeraf', component: SenaraiDerafpembetulanComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TugasanHarianRoutingModule { }
