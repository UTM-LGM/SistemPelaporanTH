import { Component, OnInit } from '@angular/core';
import { TugasanHarianService } from '../tugasan-harian.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { employees } from 'src/app/models/employees.model';
import { tugasHarian_Detail } from 'src/app/models/tugasHarian_Detail.model';
import { tugasHarian_Main } from 'src/app/models/tugasHarian_Main.model';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-detail-laporan-individu',
  templateUrl: './detail-laporan-individu.component.html',
  styleUrls: ['./detail-laporan-individu.component.css']
})
export class DetailLaporanIndividuComponent implements OnInit {

  currentUser: employees = {} as employees;
  thMainId: number;
  dateDisplay: string = '';
  tugasan: tugasHarian_Detail[] = [];
  laporanMain: tugasHarian_Main[] = [];
  today = new Date();

  constructor(
    private laporanTugas: TugasanHarianService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthServiceService
  ) { }

  ngOnInit(): void {
    this.authService.currentEmail.subscribe(email => {
      this.currentUser.empEmailLogin = email;
      if (this.currentUser.empEmailLogin) {
        this.route.paramMap.subscribe(params => {
          this.thMainId = +params.get('id')!;
          this.loadData(this.thMainId);
          this.mainData(this.thMainId)
          this.dateDisplay = this.datePipe.transform(this.today, 'EEEE, dd MMMM yyyy', 'ms') || '';
          this.tugasan = [{ id: 0, thMainId: 0, masaMula: "", masaTamat: "", tugasanHarian: "" }];
          this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
            this.currentUser = res;
          });
        });
      }
    });
  }

  loadData(id: number) {
    this.laporanTugas.getTugasanDetailById(id).subscribe(res => {
      this.tugasan = res.map(item => ({
        ...item
      }));
    });
  }

  mainData(id: number) {
    this.laporanTugas.getMainById(id).subscribe(res => {
      this.laporanMain = res
    });
  }
}
