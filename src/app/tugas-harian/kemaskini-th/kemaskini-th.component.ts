import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotisPadamComponent } from 'src/app/dialogbox/notis-padam/notis-padam.component';
import Swal from 'sweetalert2';
import { TugasanHarianService } from '../tugasan-harian.service';
import { tugasHarian_Main } from 'src/app/models/tugasHarian_Main.model';
import { tugasHarian_Detail } from 'src/app/models/tugasHarian_Detail.model';
import { employees } from 'src/app/models/employees.model';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-kemaskini-th',
  templateUrl: './kemaskini-th.component.html',
  styleUrls: ['./kemaskini-th.component.css']
})
export class KemaskiniTHComponent implements OnInit {

  currentUser: employees = {} as employees;
  tugasan: tugasHarian_Detail[] = [];
  mainTugasan: tugasHarian_Main = {} as tugasHarian_Main;
  dateDisplay: string = '';
  currentDate: Date = new Date();
  today = new Date();
  timeOptions: string[] = [];
  masaMulaOptions: string[] = [];
  thMainId: number;

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

  constructor(
    private laporanTugas: TugasanHarianService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private router: Router,
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

          this.dateDisplay = this.datePipe.transform(this.today, 'EEEE, dd MMMM yyyy', 'ms') || '';
          this.generateTimeOptions();
          this.tugasan = [{ id: 0, thMainId: 0, masaMula: "", masaTamat: "", tugasanHarian: "" }];
          this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
            this.currentUser = res;
          });
        });
      }
    });
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

    if (tugasHarian && tugasHarian.trim() !== '') {
      const dialogRef = this.dialog.open(NotisPadamComponent, {
        width: '445px',
      });

      dialogRef.afterClosed().subscribe(x => {
        if (x === true) {
          const tugasId = this.tugasan[index].id;
          this.laporanTugas.deleteTHById(tugasId).subscribe();
          this.tugasan.splice(index, 1);
          Swal.fire({
            imageUrl: 'assets/image/dustbin.png',  // Replace with the path to your custom icon
            imageWidth: 100,  // Adjust the width as needed
            imageHeight: 100,  // Adjust the height as needed
            imageAlt: 'Custom Icon',
            html: '<span style="font-size: 18px;">Tugasan berjaya dipadam</span>',
            showConfirmButton: false,
            timer: 1800
          });
        }
      });
    } else {
      this.tugasan.splice(index, 1);
    }
  }

  loadData(id: number) {
    this.laporanTugas.getTugasanById(id).subscribe(res => {
      this.tugasan = res.map(item => ({
        ...item,
        filteredMasaTamatOptions: this.getFilteredMasaTamat(item.masaMula)
      }));
    });
  }

  onMasaMulaChange(index: number, masaMula: string) {
    this.tugasan[index].filteredMasaTamatOptions = this.getFilteredMasaTamat(masaMula);
    this.tugasan[index].masaTamat = '';
  }

  update() {
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
    this.laporanTugas.updateTugasan(this.tugasan).subscribe(
      response => {
        Swal.fire({
          html: '<span style="font-size: 18px;">Laporan berjaya dikemaskini.</span>',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500,
        });
        this.router.navigate(['/senaraiDeraf']);
      },
      error => {
        Swal.fire({
          html: '<span style="font-size: 18px;">Ralat berlaku semasa mengemaskini laporan.</span>',
          icon: 'error',
          showConfirmButton: false,
          timer: 2500,
        });
        this.router.navigate(['/senaraiDeraf']);
      }
    );
  }

  updateSend() {
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
