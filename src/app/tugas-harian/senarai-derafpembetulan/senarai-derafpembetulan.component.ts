import { Component, OnInit } from '@angular/core';
import { employees } from 'src/app/models/employees.model';
import { TugasanHarianService } from '../tugasan-harian.service';
import { tugasHarian_Main } from 'src/app/models/tugasHarian_Main.model';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { userDTO } from 'src/app/models/userDTO.model';

@Component({
  selector: 'app-senarai-derafpembetulan',
  templateUrl: './senarai-derafpembetulan.component.html',
  styleUrls: ['./senarai-derafpembetulan.component.css']
})
export class SenaraiDerafpembetulanComponent implements OnInit {

  currentUser: employees = {} as employees;
  laporanMain: tugasHarian_Main[] = [];

  constructor(
    private laporanTugas: TugasanHarianService,
    private authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authService.currentEmail.subscribe(email => {
      this.currentUser.empEmailLogin = email;
      if (this.currentUser.empEmailLogin) {
        this.laporanTugas.getKakitanganByEmail(this.currentUser.empEmailLogin).subscribe(res => {
          this.currentUser = res;
          this.fetchSenaraiDeraf();
        });
      }
    });
    // Re-fetch data on every navigation to this component
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd && this.route.firstChild.snapshot.routeConfig.path === 'senaraiDerafpembetulan')
    ).subscribe(() => {
      this.fetchSenaraiDeraf();
    });
  }

  
  fetchSenaraiDeraf(): void {
    this.laporanTugas.getSenaraiDeraf(this.currentUser.empId).subscribe(draf => {
      this.laporanMain = draf;
    });
  }

}
