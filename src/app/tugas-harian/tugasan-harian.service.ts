import { Injectable } from '@angular/core';
import { employees } from '../models/employees.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tugasHarian_Main } from '../models/tugasHarian_Main.model';
import { tugasHarian_Detail } from '../models/tugasHarian_Detail.model';
import { unit } from '../models/unit.model';
import { ref_StatusTH } from '../models/ref_StatusTH.model';

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

  checkBeforeFilled(empId): Observable<tugasHarian_Main> {
    return this.httpClient.get<tugasHarian_Main>(this.baseUrl + '/TugasHarianMains/GetBeforeFilled/' + empId);
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

  // updateTugasan(tugasan: tugasHarian_Detail[]): Observable<any> {
  //   return this.httpClient.put(`${this.baseUrl}/TugasHarianDetails/UpdateTugasHarian`, tugasan);
  // }

  updateTugasan(tugasan: tugasHarian_Detail[], thMainId: number): Observable<any> {
    const url = `${this.baseUrl}/TugasHarianDetails/UpdateTugasHarian?thMainId=${thMainId}`;
    return this.httpClient.put(url, tugasan);
  }
  

  // updateDerafDetail(tugasan: tugasHarian_Detail[]): Observable<any> {
  //   return this.httpClient.put(`${this.baseUrl}/TugasHarianDetails/UpdateHantarTugasHarian`, tugasan);
  // }

  updateDerafDetail(tugasan: tugasHarian_Detail[], thMainId: number): Observable<any> {
    const url = `${this.baseUrl}/TugasHarianDetails/UpdateHantarTugasHarian?thMainId=${thMainId}`;
    return this.httpClient.put(url, tugasan);
  }
  

  deleteTHById(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/TugasHarianDetails/DeleteTugasHarianDetail/`+ id);
  }

  ////////////////////////////////// Kelulusan Tugasan Harian/////////////////////////////////////////////////

  getSenaraiKelulusan(empId): Observable<tugasHarian_Main[]> {
    return this.httpClient.get<tugasHarian_Main[]>(this.baseUrl + '/TugasHarianMains/GetSenaraiKelulusan/' + empId);
  }

  getSenaraiPelulus(empId): Observable<employees[]> {
    return this.httpClient.get<employees[]>(this.baseUrl + '/Employees/GetSenaraiPelulus/' + empId);
  }

  getTugasanDetailById(id): Observable<tugasHarian_Detail[]> {
    return this.httpClient.get<tugasHarian_Detail[]>(this.baseUrl + '/TugasHarianDetails/GetTugasanDetailsById/' + id);
  }

  getMainById(id): Observable<tugasHarian_Main[]> {
    return this.httpClient.get<tugasHarian_Main[]>(this.baseUrl + '/TugasHarianMains/GetMainById/' + id);
  }

  kelulusanTolak(id,Remarks): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.put(this.baseUrl + '/TugasHarianMains/UpdatekelulusanTolak/' + id +'/' + Remarks, httpOptions);
  }

  kelulusanLulus(id): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.put(this.baseUrl + '/TugasHarianMains/UpdatekelulusanLulus/' + id, httpOptions);
  }

  getSenaraiUnit(): Observable<any> {
    return this.httpClient.get<unit[]>(this.baseUrl + '/Units/GetSenaraiUnit');
  }

  getSenaraiKakitangan(emp_id) {
    return this.httpClient.get<employees[]>(this.baseUrl + '/Employees/GetSenaraiKakitangan/' + emp_id);
  }

  getSenaraiSemak(emp_id,tarikh) {
    return this.httpClient.get<employees[]>(this.baseUrl + '/Employees/GetSenaraiSemak/' + emp_id + '/' + tarikh);
  }

  getSenaraiSemakUnit(emp_id,unit_id,tarikh) {
    return this.httpClient.get<employees[]>(this.baseUrl + '/Employees/GetSenaraiSemakUnit/' + emp_id + '/' + unit_id + '/' + tarikh);
  }

  getUnitKU(emp_id) {
    return this.httpClient.get<unit[]>(this.baseUrl + '/Units/GetSenaraiUnitKU/' + emp_id);
  }

  getSenaraiSemakAll(emp_id,tarikh) {
    return this.httpClient.get<employees[]>(this.baseUrl + '/Employees/GetSenaraiSemakAll/' + emp_id + '/' + tarikh);
  }
  
  ////////////////////////////////// Laporan Tugasan Harian Individu/////////////////////////////////////////////

  getSenaraiLaporanIndividu(empId): Observable<tugasHarian_Main[]> {
    return this.httpClient.get<tugasHarian_Main[]>(this.baseUrl + '/TugasHarianMains/GetSenaraiLaporanIndividu/' + empId);
  }

  getStatus() {
    return this.httpClient.get<ref_StatusTH[]>(this.baseUrl + '/RefStatusThs/GetStatus');
  }

  getSenaraiLaporanIndividuAll(empId): Observable<tugasHarian_Main[]> {
    return this.httpClient.get<tugasHarian_Main[]>(this.baseUrl + '/TugasHarianMains/GetSenaraiLaporanIndividu2/' + empId);
  }

  getSenaraiLaporanKeseluruhan(empId): Observable<tugasHarian_Main[]> {
    return this.httpClient.get<tugasHarian_Main[]>(this.baseUrl + '/TugasHarianMains/GetSenaraiLaporanAll/' + empId);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
