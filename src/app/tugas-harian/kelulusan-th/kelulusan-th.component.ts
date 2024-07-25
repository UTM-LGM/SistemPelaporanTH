import { Component, OnInit, ViewChild } from '@angular/core';
import { employees } from 'src/app/models/employees.model';
import { tugasHarian_Main } from 'src/app/models/tugasHarian_Main.model';
import { TugasanHarianService } from '../tugasan-harian.service';
import { unit } from 'src/app/models/unit.model';
import { DatePipe } from '@angular/common';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-kelulusan-th',
  templateUrl: './kelulusan-th.component.html',
  styleUrls: ['./kelulusan-th.component.css']
})
export class KelulusanTHComponent implements OnInit {

  @ViewChild('unitSelect') unitSelect: MatSelect;

  currentUser: employees = {} as employees;
  laporanMain: tugasHarian_Main[] = [];
  mainTugasan: tugasHarian_Main = {} as tugasHarian_Main;
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
    });
    this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
      this.currentUser = res;
      this.laporanTugas.getSenaraiKakitangan(this.currentUser.empId).subscribe(staff => {
        this.employees = staff;
      })
      this.laporanTugas.getSenaraiKelulusan(this.currentUser.empId).subscribe(lulus => {
        this.laporanMain = lulus;
        this.filteredLaporanMain = lulus;
      })
    });
  }

  filterLaporanByUnit() {
    if (this.selectedUnitId) {
      this.filteredLaporanMain = this.laporanMain.filter(item => item.unitId === this.selectedUnitId);
    } else {
      this.filteredLaporanMain = this.laporanMain;
    }
  }

  filterLaporanByName() {
    if (this.selectedEmpId) {
      this.filteredLaporanMain = this.laporanMain.filter(item => item.empid === this.selectedEmpId);
    } else {
      this.filteredLaporanMain = this.laporanMain;
    }
  }

  filterLaporanByTarikh() {
    if (this.selectedTarikh) {
      const formattedSelectedTarikh = this.datePipe.transform(this.selectedTarikh, 'dd-MM-yyyy');
      this.filteredLaporanMain = this.laporanMain.filter(item => {
        if (typeof item.tarikh === 'string') {
          const [day, month, year] = item.tarikh.split('-');
          const itemDate = new Date(+year, +month - 1, +day);
          const formattedItemDate = this.datePipe.transform(itemDate, 'dd-MM-yyyy');
          return formattedItemDate === formattedSelectedTarikh;
        } else if (item.tarikh instanceof Date) {
          const formattedItemDate = this.datePipe.transform(item.tarikh, 'dd-MM-yyyy');
          return formattedItemDate === formattedSelectedTarikh;
        } else {
          return false; // if the tarikh is neither string nor Date
        }
      });
    } else {
      this.filteredLaporanMain = this.laporanMain;
    }
  }

  tolak() {
  }
  

}
