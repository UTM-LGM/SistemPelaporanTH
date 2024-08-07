import { Component, OnInit } from '@angular/core';
import { employees } from 'src/app/models/employees.model';
import { tugasHarian_Main } from 'src/app/models/tugasHarian_Main.model';
import { TugasanHarianService } from '../tugasan-harian.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { ref_StatusTH } from 'src/app/models/ref_StatusTH.model';

@Component({
  selector: 'app-senarai-laporan-th-individu',
  templateUrl: './senarai-laporan-th-individu.component.html',
  styleUrls: ['./senarai-laporan-th-individu.component.css']
})
export class SenaraiLaporanTHIndividuComponent implements OnInit {

  currentUser: employees = {} as employees;
  laporanMain: tugasHarian_Main[] = [];
  laporanforFilter: tugasHarian_Main[] = [];
  filteredLaporanMain: tugasHarian_Main[] = [];
  displayedLaporanMain: tugasHarian_Main[] = [];
  statuses: ref_StatusTH[] = [];
  selectedMonth: string = '';
  selectedYear: string = '';
  selectedStatus: number;

  months = [
    { value: '01', viewValue: 'Januari' },
    { value: '02', viewValue: 'Februari' },
    { value: '03', viewValue: 'Mac' },
    { value: '04', viewValue: 'April' },
    { value: '05', viewValue: 'Mei' },
    { value: '06', viewValue: 'Jun' },
    { value: '07', viewValue: 'Julai' },
    { value: '08', viewValue: 'Ogos' },
    { value: '09', viewValue: 'September' },
    { value: '10', viewValue: 'Oktober' },
    { value: '11', viewValue: 'November' },
    { value: '12', viewValue: 'Disember' }
  ];

  years: { value: string, viewValue: string }[] = [];

  constructor(
    private laporanTugas: TugasanHarianService,
    private authService: AuthServiceService
  ) { }

  ngOnInit(): void {
    this.generateYearOptions();
    this.laporanTugas.getStatus().subscribe(status => this.statuses = status);
    this.authService.currentEmail.subscribe(email => {
      this.currentUser.empEmailLogin = email;
      if (this.currentUser.empEmailLogin) {
        this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
          this.currentUser = res;
          this.laporanTugas.getSenaraiLaporanIndividu(this.currentUser.empId).subscribe(report => {
            this.laporanMain = report
            this.displayedLaporanMain = this.laporanMain;
          })
          this.laporanTugas.getSenaraiLaporanIndividuAll(this.currentUser.empId).subscribe(report => {
            this.laporanforFilter = report
          })
        });
      }
    });
  }

  generateYearOptions(): void {
    const startYear = 2024;
    const currentYear = new Date().getFullYear();
    this.years = [];
    for (let year = startYear; year <= currentYear; year++) {
      this.years.push({ value: year.toString(), viewValue: year.toString() });
    }
  }

  filterReports(): void {
    this.displayedLaporanMain = this.laporanforFilter.filter(item => {
      const matchesMonth = this.selectedMonth ? item.month === this.selectedMonth : true;
      const matchesYear = this.selectedYear ? item.year === this.selectedYear : true;
      const matchesStatus = this.selectedStatus ? item.statusThId === this.selectedStatus : true;
      return matchesMonth && matchesYear && matchesStatus;
    });
  }

}
