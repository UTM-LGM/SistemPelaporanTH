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

      this.dateDisplay = this.datePipe.transform(this.today, 'EEEE, dd MMMM yyyy', 'ms') || '';
      this.generateTimeOptions();
      this.tugasan = [{ id: 0, thMainId: 0, masaMula: "", masaTamat: "", tugasanHarian: "" }];
      this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
        this.currentUser = res;
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
      },
      error => {
        Swal.fire({
          html: '<span style="font-size: 18px;">Ralat berlaku semasa mengemaskini laporan.</span>',
          icon: 'error',
          showConfirmButton: false,
          timer: 2500,
        });
      }
    );
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
