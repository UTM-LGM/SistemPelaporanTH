import { Component, OnInit } from '@angular/core';
import { TugasanHarianService } from '../tugasan-harian.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { employees } from 'src/app/models/employees.model';
import { DatePipe } from '@angular/common';
import { tugasHarian_Main } from 'src/app/models/tugasHarian_Main.model';
import { userDTO } from 'src/app/models/userDTO.model';

@Component({
  selector: 'app-laporan-semak-semasa',
  templateUrl: './laporan-semak-semasa.component.html',
  styleUrls: ['./laporan-semak-semasa.component.css']
})
export class LaporanSemakSemasaComponent implements OnInit {

  currentUser: employees = {} as employees;
  employees: employees[] = [];
  selectedTarikh: Date;
  filterApplied: boolean = false;
  duplicateUnitIds: employees[] = [];
  selectedUnitId: string;
  filteredLaporanMain: tugasHarian_Main[] = [];

  constructor(
    private laporanTugas: TugasanHarianService,
    private authService: AuthServiceService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.selectedTarikh = new Date();
    this.authService.currentEmail.subscribe(email => {
      this.currentUser.empEmailLogin = email;
      if (this.currentUser.empEmailLogin) {
        this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
          this.currentUser = res;
          this.filterByTarikh();
        });
      }
    });
  }

  filterByTarikh() {
    const formattedSelectedTarikh = this.datePipe.transform(this.selectedTarikh, 'yyyy-MM-dd');
    this.laporanTugas.getSenaraiSemak(this.currentUser.empId, formattedSelectedTarikh).subscribe(staff => {
      this.employees = staff;
    })
  }

}
