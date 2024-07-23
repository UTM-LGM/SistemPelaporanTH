import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { tugasHarian_Detail } from 'src/app/models/tugasHarian_Detail.model';
import { TugasanHarianService } from '../tugasan-harian.service';
import { employees } from 'src/app/models/employees.model';
import { tugasHarian_Main } from 'src/app/models/tugasHarian_Main.model';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NotisPadamComponent } from 'src/app/dialogbox/notis-padam/notis-padam.component';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { ExistDataComponent } from 'src/app/dialogbox/exist-data/exist-data.component';
import { ExistDataHantarComponent } from 'src/app/dialogbox/exist-data-hantar/exist-data-hantar.component';

@Component({
  selector: 'app-tambah-tugas-harian',
  templateUrl: './tambah-tugas-harian.component.html',
  styleUrls: ['./tambah-tugas-harian.component.css']
})
export class TambahTugasHarianComponent implements OnInit {

  @ViewChild('sweetAlertContainer', { static: false }) sweetAlertContainer!: ElementRef;

  currentUser: employees = {} as employees;
  tugasan: tugasHarian_Detail[] = [];
  mainTugasan: tugasHarian_Main = {} as tugasHarian_Main;
  dateDisplay: string = '';
  currentDate: Date = new Date();
  today = new Date();
  timeOptions: string[] = [];
  masaMulaOptions: string[] = [];
  dateExistStatusThId: number | null = null;

  constructor(
    private laporanTugas: TugasanHarianService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.currentUser.empEmailLogin = 'amelia@lgm.gov.my';
    this.dateDisplay = this.datePipe.transform(this.today, 'EEEE, dd MMMM yyyy', 'ms') || '';
    this.generateTimeOptions();
    this.tugasan = [{ id: 0, thMainId: 0, masaMula: "", masaTamat: "", tugasanHarian: "" }];
    this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
      this.currentUser = res;
      this.laporanTugas.checkIfDateExist(this.currentUser.empId).subscribe(dateExist => {
        console.log(Object.keys(dateExist).length > 0)
        this.dateExistStatusThId = dateExist?.statusThId || null;
        if (dateExist && Object.keys(dateExist).length > 0) {
          if (dateExist.statusThId == 1) {
            const dialogRef = this.dialog.open(ExistDataComponent, {
              width: '445px',
            });
          } else if (dateExist.statusThId == 2) {
            const dialogRef = this.dialog.open(ExistDataHantarComponent, {
              width: '445px',
            });
          }
        }
      });
    });
  }

  generateTimeOptions() {
    let time = new Date();
    time.setHours(7, 30, 0); // Start at 07:30

    while (time.getHours() < 18 || (time.getHours() === 18 && time.getMinutes() === 0)) {
      this.timeOptions.push(this.formatTime(time));
      time.setMinutes(time.getMinutes() + 30);
    }
  }

  formatTime(time: Date): string {
    return ('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2);
  }

  getFilteredMasaTamat(masaMula: string): string[] {
    const startIndex = this.timeOptions.indexOf(masaMula);
    return this.timeOptions.slice(startIndex + 1);
  }

  tambah() {
    this.tugasan.push({ id: 0, thMainId: 0, masaMula: "", masaTamat: "", tugasanHarian: "" })
  }

  padam(index: number) {
    const tugasHarian = this.tugasan[index].tugasanHarian;

    // Check if the tugasanHarian field is not empty
    if (tugasHarian && tugasHarian.trim() !== '') {
      const dialogRef = this.dialog.open(NotisPadamComponent, {
        width: '445px',
      });

      dialogRef.afterClosed().subscribe(x => {
        if (x === true) {
          this.tugasan.splice(index, 1);
        }
      });
    } else {
      // If there's no text, just remove the item directly
      this.tugasan.splice(index, 1);
    }
  }

  simpan() {
    if (this.dateExistStatusThId === 1) {
      Swal.fire({
        html: '<span style="font-size: 18px;">Tidak boleh disimpan kerana tugasan harian pada hari ini telah wujud</span>',
        icon: 'error',
        showConfirmButton: false,
        timer: 2500,
      });
      this.router.navigate(['/senaraiDeraf']);
      return;
    }
    else if (this.dateExistStatusThId === 2) {
      Swal.fire({
        html: '<span style="font-size: 18px;">Tidak boleh disimpan kerana tugasan harian pada hari ini telah dihantar</span>',
        icon: 'error',
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }

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

    this.mainTugasan.EmpId = this.currentUser.empId;
    this.mainTugasan.UnitId = this.currentUser.unitId;
    this.mainTugasan.StatusThId = 1;
    this.mainTugasan.StatusKelulusanId = null;

    this.laporanTugas.simpanDeraf(this.mainTugasan).subscribe(mainResult => {
      this.mainTugasan = mainResult;

      if (this.mainTugasan.id) {
        let detailRequests = this.tugasan.map(tugas => ({
          id: tugas.id,
          thMainId: this.mainTugasan.id,
          masaMula: tugas.masaMula,
          masaTamat: tugas.masaTamat,
          tugasanHarian: tugas.tugasanHarian
        }));

        this.laporanTugas.simpanDerafDetail(detailRequests).subscribe(detailResult => {
          Swal.fire({
            title: 'Deraf',
            imageUrl: 'assets/image/draf.png',  // Replace with the path to your custom icon
            imageWidth: 100,  // Adjust the width as needed
            imageHeight: 100,  // Adjust the height as needed
            imageAlt: 'Custom Icon',
            html: '<span style="font-size: 18px;">Tugasan harian telah disimpan</span>',
            showConfirmButton: false,
            timer: 2000
          });
        }, error => {
          console.error('Error saving details:', error);
        });

      } else {
        console.error('Error: mainTugasan.Id is not set');
      }
    }, error => {
      console.error('Error saving mainTugasan:', error);
    });
    this.router.navigate(['/senaraiDeraf']);
  }

  hantar() {
    if (this.dateExistStatusThId === 1 || this.dateExistStatusThId === 2) {
      Swal.fire({
        html: '<span style="font-size: 18px;">Tidak boleh disimpan kerana tugasan harian pada hari ini telah wujud</span>',
        icon: 'error',
        showConfirmButton: false,
        timer: 2500,
      });
      this.router.navigate(['/senaraiDeraf']);
      return;
    }
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

    this.mainTugasan.EmpId = this.currentUser.empId;
    this.mainTugasan.UnitId = this.currentUser.unitId;
    this.mainTugasan.StatusThId = 2;
    this.mainTugasan.StatusKelulusanId = null;

    this.laporanTugas.simpanDeraf(this.mainTugasan).subscribe(mainResult => {
      this.mainTugasan = mainResult;

      if (this.mainTugasan.id) {
        let detailRequests = this.tugasan.map(tugas => ({
          id: tugas.id,
          thMainId: this.mainTugasan.id,
          masaMula: tugas.masaMula,
          masaTamat: tugas.masaTamat,
          tugasanHarian: tugas.tugasanHarian
        }));

        this.laporanTugas.simpanDerafDetail(detailRequests).subscribe(detailResult => {
          Swal.fire({
            html: '<span style="font-size: 18px;">Laporan tugasan harian berjaya dihantar.</span>',
            icon: 'success',
            showConfirmButton: false,
            timer: 2500,
          });
        }, error => {
          console.error('Error saving details:', error);
        });

      } else {
        console.error('Error: mainTugasan.Id is not set');
      }
    }, error => {
      console.error('Error saving mainTugasan:', error);
    });

  }

}
