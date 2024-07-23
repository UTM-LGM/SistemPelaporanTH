import { Injectable } from '@angular/core';
import { employees } from '../models/employees.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tugasHarian_Main } from '../models/tugasHarian_Main.model';
import { tugasHarian_Detail } from '../models/tugasHarian_Detail.model';

@Injectable({
  providedIn: 'root'
})
export class TugasanHarianService {

  baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  ////////////////////////////////// Tambah Tugas Harian/////////////////////////////////////////////////

  getKakitanganByEmail(emp_email): Observable<employees> {
    return this.httpClient.get<employees>(this.baseUrl + '/Employees/GetKakitangan/' + emp_email);
  }

  checkIfDateExist(empId): Observable<tugasHarian_Main> {
    return this.httpClient.get<tugasHarian_Main>(this.baseUrl + '/TugasHarianMains/GetTugasHarianExist/' + empId);
  }

  simpanDeraf(data: tugasHarian_Main): Observable<tugasHarian_Main> {
    var body = JSON.stringify(data);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<tugasHarian_Main>(this.baseUrl + '/TugasHarianMains/PostTugasHarian', body, httpOptions)
  }

  hantarTugasan(data: tugasHarian_Main): Observable<tugasHarian_Main> {
    var body = JSON.stringify(data);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<tugasHarian_Main>(this.baseUrl + '/TugasHarianMains/PostHantarTugasHarian', body, httpOptions)
  }

  simpanDerafDetail(detailRequests: tugasHarian_Detail[]): Observable<tugasHarian_Detail[]> {
    var body = JSON.stringify(detailRequests);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<tugasHarian_Detail[]>(this.baseUrl + '/TugasHarianDetails/PostTugasHarianDetail', body, httpOptions)
  }

  ////////////////////////////////// Senarai draf dan pembetulan/////////////////////////////////////////////////

  getSenaraiDeraf(empId): Observable<tugasHarian_Main[]> {
    return this.httpClient.get<tugasHarian_Main[]>(this.baseUrl + '/TugasHarianMains/GetSenaraiDeraf/' + empId);
  }

  getTugasanById(id): Observable<tugasHarian_Detail[]> {
    return this.httpClient.get<tugasHarian_Detail[]>(this.baseUrl + '/TugasHarianDetails/GetTugasanById/' + id);
  }

  ////////////////////////////////// Kemaskini Tugasan Harian/////////////////////////////////////////////////

  updateTugasan(tugasan: tugasHarian_Detail[]): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/TugasHarianDetails/UpdateTugasHarian`, tugasan);
  }

  updateDerafDetail(tugasan: tugasHarian_Detail[]): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/TugasHarianDetails/UpdateHantarTugasHarian`, tugasan);
  }

  ////////////////////////////////// Kelulusan Tugasan Harian/////////////////////////////////////////////////

  getSenaraiKelulusan(empId): Observable<tugasHarian_Main[]> {
    return this.httpClient.get<tugasHarian_Main[]>(this.baseUrl + '/TugasHarianMains/GetSenaraiKelulusan/' + empId);
  }

  getTugasanDetailById(id): Observable<tugasHarian_Detail[]> {
    return this.httpClient.get<tugasHarian_Detail[]>(this.baseUrl + '/TugasHarianDetails/GetTugasanDetailsById/' + id);
  }

  getMainById(id): Observable<tugasHarian_Main[]> {
    return this.httpClient.get<tugasHarian_Main[]>(this.baseUrl + '/TugasHarianMains/GetMainById/' + id);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
