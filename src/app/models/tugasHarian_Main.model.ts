import { tugasHarian_Detail } from "./tugasHarian_Detail.model";

export class tugasHarian_Main{
    id: number;
    Tarikh: Date;
    EmpId: number;
    UnitId:string;
    StatusThId: number;
    statusThId: number;
    StatusKelulusanId: number;
    Tugas: tugasHarian_Detail[] = [];
}