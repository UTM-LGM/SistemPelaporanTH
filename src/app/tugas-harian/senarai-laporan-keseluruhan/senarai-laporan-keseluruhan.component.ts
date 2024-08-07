import { Component, OnInit } from '@angular/core';
import { TugasanHarianService } from '../tugasan-harian.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { employees } from 'src/app/models/employees.model';
import { tugasHarian_Main } from 'src/app/models/tugasHarian_Main.model';

@Component({
  selector: 'app-senarai-laporan-keseluruhan',
  templateUrl: './senarai-laporan-keseluruhan.component.html',
  styleUrls: ['./senarai-laporan-keseluruhan.component.css']
})
export class SenaraiLaporanKeseluruhanComponent implements OnInit {

  currentUser: employees = {} as employees;
  laporanMain: tugasHarian_Main[] = [];
  filteredLaporanMain: tugasHarian_Main[] = [];
  employees: employees[] = [];
  selectedEmpId: number;

  constructor(
    private laporanTugas: TugasanHarianService,
    private authService: AuthServiceService
  ) { }

  ngOnInit(): void {
    this.authService.currentEmail.subscribe(email => {
      this.currentUser.empEmailLogin = email;
      if (this.currentUser.empEmailLogin) {
        this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
          this.currentUser = res;
          this.laporanTugas.getSenaraiKakitangan(this.currentUser.empId).subscribe(staff => {
            this.employees = staff;
          })
        });
      }
    });
  }

  filterLaporanByName() {
    if (this.selectedEmpId) {
      this.laporanTugas.getSenaraiLaporanKeseluruhan(this.selectedEmpId).subscribe(li => {
        this.filteredLaporanMain = li;
      })
    }
  }

}
