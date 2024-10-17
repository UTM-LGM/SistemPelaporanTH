import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { employees } from 'src/app/models/employees.model';
import { TugasanHarianService } from '../tugasan-harian.service';
import { userDTO } from 'src/app/models/userDTO.model';

@Component({
  selector: 'app-laman-utama',
  templateUrl: './laman-utama.component.html',
  styleUrls: ['./laman-utama.component.css']
})

export class LamanUtamaComponent implements OnInit {

  currentUser: employees = {} as employees;
  dateExistResult: any = null;
  flashState: string = 'flashOn';
  isLoading: boolean = false;

  constructor(
    private authService: AuthServiceService,
    private laporanTugas: TugasanHarianService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.currentEmail.subscribe(email => {
      this.currentUser.empEmailLogin = email;
      if (this.currentUser.empEmailLogin) {
        this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
          this.currentUser = res;
          this.laporanTugas.checkBeforeFilled(this.currentUser.empId).subscribe(dateExistResult => {
            this.dateExistResult = dateExistResult;
            this.isLoading = false; // Stop the spinner after data is loaded
        }, error => {
          this.isLoading = false; // Stop the spinner in case of an error
        });
      }, error => {
        this.isLoading = false; // Stop the spinner in case of an error
      });
    } else {
      this.isLoading = false; // Stop the spinner if there's no email
    }
  });
}

}
