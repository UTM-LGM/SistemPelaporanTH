import { Component, OnInit } from '@angular/core';
import { employees } from 'src/app/models/employees.model';
import { tugasHarian_Main } from 'src/app/models/tugasHarian_Main.model';
import { TugasanHarianService } from '../tugasan-harian.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { DatePipe } from '@angular/common';
import { unit } from 'src/app/models/unit.model';
import { userDTO } from 'src/app/models/userDTO.model';
import { ref_StatusTH } from 'src/app/models/ref_StatusTH.model';

@Component({
  selector: 'app-laporan-semak-ku',
  templateUrl: './laporan-semak-ku.component.html',
  styleUrls: ['./laporan-semak-ku.component.css']
})
export class LaporanSemakKuComponent implements OnInit {

  
  currentUser: employees = {} as employees;
  employees: employees[] = [];
  selectedTarikh: Date;
  filterApplied: boolean = false;
  duplicateUnitIds: unit[] = [];
  selectedUnitId: string;
  statuses: ref_StatusTH[] = [];
  selectedStatus: number;

  constructor(
    private laporanTugas: TugasanHarianService,
    private authService: AuthServiceService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.selectedTarikh = new Date();
    this.fetchStatuses();
    this.authService.currentEmail.subscribe(email => {
      this.currentUser.empEmailLogin = email;
      if (this.currentUser.empEmailLogin) {
        this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
          this.currentUser = res;
          this.filterByTarikh();
          this.fetchAndFilterUnits();
        });
      }
    });
  }

  fetchStatuses() {
    this.laporanTugas.getStatus().subscribe(statuses => {
      this.statuses = statuses;
      const tiadaTHStatus: ref_StatusTH = { ID: 0, id: 0, statusTH: "Tiada TH", StatusTH: "Tiada TH" }; 
      this.statuses.unshift(tiadaTHStatus);
    });
  }

  filterByTarikh() {
    const formattedSelectedTarikh = this.datePipe.transform(this.selectedTarikh, 'yyyy-MM-dd');
    this.laporanTugas.getSenaraiSemakUnit(this.currentUser.empId, this.currentUser.unitId, formattedSelectedTarikh).subscribe(staff => {
      this.employees = staff;
      this.applyFilters();
    })
  }

  fetchAndFilterUnits() {
    this.laporanTugas.getUnitKU(this.currentUser.empId).subscribe(units => {
      this.duplicateUnitIds = units;
    });
  }

  applyFilters() {
    this.applyUnitFilter();
    this.applyStatusFilter();
  }

  applyUnitFilter() {
    if (this.selectedUnitId) {
      this.employees = this.employees.filter(emp => emp.unitId === this.selectedUnitId);
    }
  }

  applyStatusFilter() {
    if (this.selectedStatus === 0) {
      // Filter employees where tugasHarianMain is null
      this.employees = this.employees.filter(emp => emp.tugasHarianMain == null);
    } else if (this.selectedStatus) {
      // Filter employees based on the selected status ID
      this.employees = this.employees.filter(emp => emp.tugasHarianMain?.statusThid === this.selectedStatus);
    }
  }

  onUnitChange() {
    this.filterByTarikh();
  }

  onStatusChange() {
    this.filterByTarikh(); 
  }

  resetStatus() {
    this.selectedStatus = null; // or you can set it to 0 based on your requirement
    this.filterByTarikh(); // Call the method to filter the data again after reset
  }

}
