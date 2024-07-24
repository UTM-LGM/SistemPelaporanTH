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
  showSebabDitolak: boolean = false;

  constructor(
    private laporanTugas: TugasanHarianService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
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
    });
  }

  mainData(id: number) {
    this.laporanTugas.getMainById(id).subscribe(res => {
      this.laporanMain = res
    });
  }

  tolak(){
    this.showSebabDitolak = true;
    const ditolakButton = document.getElementById('ditolakButton');
    if (ditolakButton) {
      ditolakButton.classList.add('flashing');
    }

    if (!this.mainTugasan.Remarks || this.mainTugasan.Remarks.trim() === '') {
      Swal.fire({
        imageUrl: 'assets/image/fill.png',
        imageWidth: 100,  // Adjust the width as needed
        imageHeight: 100,  // Adjust the height as needed
        imageAlt: 'Custom Icon',
        html: '<span style="font-size: 18px;">Sila isi sebab ditolak</span>',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    this.laporanTugas.kelulusanTolak(this.thMainId, this.mainTugasan.Remarks).subscribe(
      response => {
        Swal.fire({
          html: '<span style="font-size: 18px;">Status tugasan harian berjaya dikemaskini.</span>',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500,
        });
        this.router.navigate(['/kelulusanTugasHarian']);
      },
      error => {
        Swal.fire({
          html: '<span style="font-size: 18px;">Ralat berlaku semasa mengemaskini status.</span>',
          icon: 'error',
          showConfirmButton: false,
          timer: 2500,
        });
      }
    );
  }

  lulus() {
    this.laporanTugas.kelulusanLulus(this.thMainId).subscribe(
      response => {
        Swal.fire({
          html: '<span style="font-size: 18px;">Status tugasan harian berjaya dikemaskini.</span>',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500,
        });
        this.router.navigate(['/kelulusanTugasHarian']);
      },
      error => {
        Swal.fire({
          html: '<span style="font-size: 18px;">Ralat berlaku semasa mengemaskini status.</span>',
          icon: 'error',
          showConfirmButton: false,
          timer: 2500,
        });
      }
    );
  }

}
