import { Component, OnInit } from '@angular/core';
import { employees } from 'src/app/models/employees.model';
import { tugasHarian_Main } from 'src/app/models/tugasHarian_Main.model';
import { TugasanHarianService } from '../tugasan-harian.service';

@Component({
  selector: 'app-kelulusan-th',
  templateUrl: './kelulusan-th.component.html',
  styleUrls: ['./kelulusan-th.component.css']
})
export class KelulusanTHComponent implements OnInit {

  currentUser: employees = {} as employees;
  laporanMain: tugasHarian_Main[] = [];

  constructor(
    private laporanTugas: TugasanHarianService
  ) { }

  ngOnInit(): void {
    this.currentUser.empEmailLogin = 'amelia@lgm.gov.my';
    this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
      this.currentUser = res;
      console.log(res)
    this.laporanTugas.getSenaraiKelulusan(this.currentUser.empId).subscribe(lulus => {
      this.laporanMain = lulus
      console.log(lulus)
    })
    });
    
  }

}
