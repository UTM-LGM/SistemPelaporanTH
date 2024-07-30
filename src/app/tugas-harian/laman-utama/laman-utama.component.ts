import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { employees } from 'src/app/models/employees.model';
import { TugasanHarianService } from '../tugasan-harian.service';

@Component({
  selector: 'app-laman-utama',
  templateUrl: './laman-utama.component.html',
  styleUrls: ['./laman-utama.component.css']
})

export class LamanUtamaComponent implements OnInit {

  currentUser: employees = {} as employees;
  dateExistResult: any = null;
  flashState: string = 'flashOn';

  constructor(
    private authService: AuthServiceService,
    private laporanTugas: TugasanHarianService,
  ) { }

  ngOnInit(): void {
    this.authService.currentEmail.subscribe(email => {
      this.currentUser.empEmailLogin = email;
      if (this.currentUser.empEmailLogin) {
        this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
          this.currentUser = res;
          this.laporanTugas.checkBeforeFilled(this.currentUser.empId).subscribe(dateExistResult => {
            this.dateExistResult = dateExistResult;
          });
        });
      }
    })
  }

}
