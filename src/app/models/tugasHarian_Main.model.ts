import { tugasHarian_Detail } from "./tugasHarian_Detail.model";

export class tugasHarian_Main{
    id: number;
    Tarikh: Date;
    EmpId: number;
    emp_name: string;
    UnitId:string;
    Remarks:string;
    StatusThId: number;
    statusThId: number;
    StatusKelulusanId: number;
    Tugas: tugasHarian_Detail[] = [];
}