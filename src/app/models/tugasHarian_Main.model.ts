import { tugasHarian_Detail } from "./tugasHarian_Detail.model";

export class tugasHarian_Main{
    id: number;
    Tarikh: Date;
    tarikh: string | Date;
    month:string;
    year:string;
    EmpId: number;
    empid: number;
    emp_name: string;
    UnitId:string;
    unitId: string;
    Remarks:string;
    tarikhDeraf: Date;
    tarikhHantar: Date;
    tarikhResubmit: Date;
    tarikhKelulusan: Date;
    tarikhTolak: Date;
    StatusThId: number;
    statusThId: number;
    statusThid: number;
    StatusKelulusanId: number;
    Tugas: tugasHarian_Detail[] = [];
}