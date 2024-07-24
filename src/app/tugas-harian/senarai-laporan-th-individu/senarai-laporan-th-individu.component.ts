import { Component, OnInit } from '@angular/core';
import { employees } from 'src/app/models/employees.model';
import { tugasHarian_Main } from 'src/app/models/tugasHarian_Main.model';
import { TugasanHarianService } from '../tugasan-harian.service';

@Component({
  selector: 'app-senarai-laporan-th-individu',
  templateUrl: './senarai-laporan-th-individu.component.html',
  styleUrls: ['./senarai-laporan-th-individu.component.css']
})
export class SenaraiLaporanTHIndividuComponent implements OnInit {

  currentUser: employees = {} as employees;
  laporanMain: tugasHarian_Main[] = [];

  constructor(
    private laporanTugas: TugasanHarianService
  ) { }

  ngOnInit(): void {
    this.currentUser.empEmailLogin = 'amelia@lgm.gov.my';
    this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
      this.currentUser = res;
    this.laporanTugas.getSenaraiLaporanIndividu(this.currentUser.empId).subscribe(report => {
      this.laporanMain = report
      console.log(report)
    })
    });
  }

}
