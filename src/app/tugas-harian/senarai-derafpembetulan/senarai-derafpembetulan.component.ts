import { Component, OnInit } from '@angular/core';
import { employees } from 'src/app/models/employees.model';
import { TugasanHarianService } from '../tugasan-harian.service';
import { tugasHarian_Main } from 'src/app/models/tugasHarian_Main.model';

@Component({
  selector: 'app-senarai-derafpembetulan',
  templateUrl: './senarai-derafpembetulan.component.html',
  styleUrls: ['./senarai-derafpembetulan.component.css']
})
export class SenaraiDerafpembetulanComponent implements OnInit {

  currentUser: employees = {} as employees;
  laporanMain: tugasHarian_Main[] = [];

  constructor(
    private laporanTugas: TugasanHarianService
  ) { }

  ngOnInit(): void {
    this.currentUser.empEmailLogin = 'amelia@lgm.gov.my';
    this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
      this.currentUser = res;
    this.laporanTugas.getSenaraiDeraf(this.currentUser.empId).subscribe(draf => {
      this.laporanMain = draf
    })
    });
  }

}
