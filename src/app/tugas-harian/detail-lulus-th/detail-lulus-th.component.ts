import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TugasanHarianService } from '../tugasan-harian.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { employees } from 'src/app/models/employees.model';
import { tugasHarian_Detail } from 'src/app/models/tugasHarian_Detail.model';
import { tugasHarian_Main } from 'src/app/models/tugasHarian_Main.model';

@Component({
  selector: 'app-detail-lulus-th',
  templateUrl: './detail-lulus-th.component.html',
  styleUrls: ['./detail-lulus-th.component.css']
})
export class DetailLulusThComponent implements OnInit {
  currentUser: employees = {} as employees;
  tugasan: tugasHarian_Detail[] = [];
  mainTugasan: tugasHarian_Main = {} as tugasHarian_Main;
  laporanMain: tugasHarian_Main[] = [];
  dateDisplay: string = '';
  currentDate: Date = new Date();
  today = new Date();
  timeOptions: string[] = [];
  masaMulaOptions: string[] = [];
  thMainId: number;

  constructor(
    private laporanTugas: TugasanHarianService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currentUser.empEmailLogin = 'amelia@lgm.gov.my';
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

  loadData(id: number) {
    this.laporanTugas.getTugasanDetailById(id).subscribe(res => {
      this.tugasan = res.map(item => ({
        ...item
      }));
      console.log(this.tugasan)
    });
  }

  mainData(id: number) {
    this.laporanTugas.getMainById(id).subscribe(res => {
      this.laporanMain = res
      console.log(this.laporanMain)
    });
  }

  updateSend(){
    let hasError = false;
  
    for (let tugas of this.tugasan) {
      if (!tugas.masaMula || !tugas.masaTamat || !tugas.tugasanHarian ||
        tugas.masaMula.trim() === '' || tugas.masaTamat.trim() === '' || tugas.tugasanHarian.trim() === '') {
        hasError = true;
        break;
      }
    }
    if (hasError) {
      Swal.fire({
        html: '<span style="font-size: 18px;">Sila pastikan semua ruangan diisi dengan lengkap sebelum disimpan.</span>',
        icon: 'error',
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }
    this.laporanTugas.updateDerafDetail(this.tugasan).subscribe(
      response => {
        Swal.fire({
          html: '<span style="font-size: 18px;">Laporan tugasan harian berjaya dihantar.</span>',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500,
        });
        this.router.navigate(['/senaraiDeraf']);
      },
      error => {
        Swal.fire({
          html: '<span style="font-size: 18px;">Ralat berlaku semasa menghantar laporan.</span>',
          icon: 'error',
          showConfirmButton: false,
          timer: 2500,
        });
      }
    );
  }

}
