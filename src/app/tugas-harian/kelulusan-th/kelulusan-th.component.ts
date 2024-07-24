import { Component, OnInit } from '@angular/core';
import { employees } from 'src/app/models/employees.model';
import { tugasHarian_Main } from 'src/app/models/tugasHarian_Main.model';
import { TugasanHarianService } from '../tugasan-harian.service';
import { unit } from 'src/app/models/unit.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-kelulusan-th',
  templateUrl: './kelulusan-th.component.html',
  styleUrls: ['./kelulusan-th.component.css']
})
export class KelulusanTHComponent implements OnInit {

  currentUser: employees = {} as employees;
  laporanMain: tugasHarian_Main[] = [];
  filteredLaporanMain: tugasHarian_Main[] = [];
  units: unit[] = [];
  employees: employees[] = [];
  selectedUnitId: string;
  selectedEmpId: number;
  selectedTarikh: Date;

  constructor(
    private laporanTugas: TugasanHarianService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.currentUser.empEmailLogin = 'amelia@lgm.gov.my';
    this.laporanTugas.getSenaraiUnit().subscribe(unit => {
      this.units = unit;
      console.log(unit)
    });
    this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
      this.currentUser = res;
      this.laporanTugas.getSenaraiKakitangan(this.currentUser.empId).subscribe(staff => {
        this.employees = staff;
        console.log(staff)
      })
      this.laporanTugas.getSenaraiKelulusan(this.currentUser.empId).subscribe(lulus => {
        this.laporanMain = lulus;
        this.filteredLaporanMain = lulus;
        console.log(lulus)
      })
    });

  }

  cari() {
    const formattedDate = this.datePipe.transform(this.selectedTarikh, 'dd-MM-yyyy');
    this.filteredLaporanMain = this.laporanMain.filter(item => {
      return (!this.selectedUnitId || item.UnitId === this.selectedUnitId) ||
             (!this.selectedEmpId || item.EmpId === this.selectedEmpId) ||
             (!this.selectedTarikh || this.datePipe.transform(item.Tarikh, 'dd-MM-yyyy') === formattedDate);
    });
    console.log(this.selectedEmpId, "id")
    console.log(formattedDate, "tarikh")
    console.log(this.selectedUnitId, "unit")

  }
}
