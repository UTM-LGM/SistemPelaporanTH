import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { tugasHarian_Detail } from 'src/app/models/tugasHarian_Detail.model';
import { TugasanHarianService } from '../tugasan-harian.service';
import { employees } from 'src/app/models/employees.model';
import { tugasHarian_Main } from 'src/app/models/tugasHarian_Main.model';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NotisPadamComponent } from 'src/app/dialogbox/notis-padam/notis-padam.component';
import { Router } from '@angular/router';
import { ExistDataComponent } from 'src/app/dialogbox/exist-data/exist-data.component';
import { ExistDataHantarComponent } from 'src/app/dialogbox/exist-data-hantar/exist-data-hantar.component';
import { ExistDrafComponent } from 'src/app/dialogbox/exist-draf/exist-draf.component';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { userDTO } from 'src/app/models/userDTO.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tambah-tugas-harian',
  templateUrl: './tambah-tugas-harian.component.html',
  styleUrls: ['./tambah-tugas-harian.component.css']
})
export class TambahTugasHarianComponent implements OnInit {

  @ViewChild('sweetAlertContainer', { static: false }) sweetAlertContainer!: ElementRef;

  config = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['undo', 'redo']],
      ['font', ['bold', 'italic', 'underline']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table']]
    ],
    fontNames: ['Arial']
  }

  user: userDTO = {} as userDTO;
  currentUser: employees = {} as employees;
  tugasan: tugasHarian_Detail[] = [];
  mainTugasan: tugasHarian_Main = {} as tugasHarian_Main;
  dateDisplay: string = '';
  currentDate: Date = new Date();
  today = new Date();
  timeOptions: string[] = [];
  masaMulaOptions: string[] = [];
  dateExistStatusThId: number | null = null;
  isDisabled: boolean = false;
  userEmail;

  constructor(
    private laporanTugas: TugasanHarianService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthServiceService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.dateDisplay = this.datePipe.transform(this.today, 'EEEE, dd MMMM yyyy', 'ms') || '';
    this.generateTimeOptions();
    this.tugasan = [{ id: 0, thMainId: 0, masaMula: "", masaTamat: "", tugasanHarian: "" }];
    this.authService.currentEmail.subscribe(email => {
      this.currentUser.empEmailLogin = email;
      if (this.currentUser.empEmailLogin) {
        this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
          this.currentUser = res;
          this.laporanTugas.checkIfDateExist(this.currentUser.empId).subscribe(dateExist => {
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
          this.laporanTugas.checkBeforeFilled(this.currentUser.empId).subscribe(not => {
            if (not) {
              const dialogRef = this.dialog.open(ExistDrafComponent, {
                width: '445px',
              });
              this.isDisabled = true;
            }
          })
        });
      }
    })
  }

  generateTimeOptions() {
    this.timeOptions = [];
  
    for (let hour = 0; hour < 24; hour++) {
      this.timeOptions.push(this.formatTime(hour, 0));
      
      this.timeOptions.push(this.formatTime(hour, 30));
    }
  }
  
  formatTime(hour, minute) {

    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    
    return `${formattedHour}:${formattedMinute}`;
  }

  getFilteredMasaTamat(masaMula: string): string[] {
    const startIndex = this.timeOptions.indexOf(masaMula);
    let filteredOptions = this.timeOptions.slice(startIndex + 1);
  
    if (masaMula <= '23:30') {
      filteredOptions.push('23:59');
    }
  
    return filteredOptions;
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
    else if (this.dateExistStatusThId === 2 || this.dateExistStatusThId === 3 || this.dateExistStatusThId === 4 || this.dateExistStatusThId === 5 || this.dateExistStatusThId === 6 || this.dateExistStatusThId === 7 || this.dateExistStatusThId === 9 || this.dateExistStatusThId === 9 || this.dateExistStatusThId === 10 || this.dateExistStatusThId === 11) {
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
        let detailRequests = this.tugasan.map(tugas => {
          const sanitizedTugasanHarian = this.sanitizer.sanitize(SecurityContext.HTML, tugas.tugasanHarian) || '';

          return {
            id: tugas.id,
            thMainId: this.mainTugasan.id,
            masaMula: tugas.masaMula,
            masaTamat: tugas.masaTamat,
            tugasanHarian: sanitizedTugasanHarian
          };
        });

        this.laporanTugas.simpanDerafDetail(detailRequests).subscribe(detailResult => {
          Swal.fire({
            title: 'Draf',
            imageUrl: 'assets/image/draf.png',  // Replace with the path to your custom icon
            imageWidth: 100,  // Adjust the width as needed
            imageHeight: 100,  // Adjust the height as needed
            imageAlt: 'Custom Icon',
            html: '<span style="font-size: 18px;">Tugasan harian telah disimpan</span>',
            showConfirmButton: false,
            timer: 1800
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
    else if (this.dateExistStatusThId === 2 || this.dateExistStatusThId === 3 || this.dateExistStatusThId === 4 || this.dateExistStatusThId === 5 || this.dateExistStatusThId === 6 || this.dateExistStatusThId === 7 || this.dateExistStatusThId === 9 || this.dateExistStatusThId === 9 || this.dateExistStatusThId === 10 || this.dateExistStatusThId === 11) {
      Swal.fire({
        html: '<span style="font-size: 18px;">Tidak boleh dihantar kerana tugasan harian pada hari ini telah dihantar</span>',
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
    this.mainTugasan.StatusThId = 2;
    this.mainTugasan.StatusKelulusanId = null;

    this.laporanTugas.hantarTugasan(this.mainTugasan).subscribe(mainResult => {
      this.mainTugasan = mainResult;

      if (this.mainTugasan.id) {
        let detailRequests = this.tugasan.map(tugas => {
          const sanitizedTugasanHarian = this.sanitizer.sanitize(SecurityContext.HTML, tugas.tugasanHarian) || '';
          return {
            id: tugas.id,
            thMainId: this.mainTugasan.id,
            masaMula: tugas.masaMula,
            masaTamat: tugas.masaTamat,
            tugasanHarian: sanitizedTugasanHarian
          };
        });

        this.laporanTugas.simpanDerafDetail(detailRequests).subscribe(detailResult => {
          Swal.fire({
            html: '<span style="font-size: 18px;">Laporan tugasan harian berjaya dihantar.</span>',
            icon: 'success',
            showConfirmButton: false,
            timer: 2500,
          });
          // Clear the tugasan array and other fields
          this.tugasan = [{ id: 0, thMainId: 0, masaMula: "", masaTamat: "", tugasanHarian: "" }];
          this.mainTugasan = {} as tugasHarian_Main;
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
