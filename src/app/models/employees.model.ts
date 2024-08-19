import { tugasHarian_Main } from "./tugasHarian_Main.model";

export class employees {
    empId: number = 0;
    empFileno: string = "";
    empName: string = "";
    empGender: string = "";
    empIcNo: string = "";
    maritalStatus: string = "";
    jawatan: string = "";
    empGrade: number = 0;
    startWorking: Date  = new Date();
    latestPromotion: Date  = new Date();
    empReligion: string = "";
    stateCode: string = "";
    empEmail: string = "";
    empEmailLogin: string = "";
    idPenyokong: number = 0;
    idPelulus: number = 0;
    idKeraniCuti: number = 0;
    idPelulusTh: number = 0;
    pelulusThName: string = "";
    wp: number = 0;
    unitId: string = "";
    unitName: string = "";
    newOpsyen: boolean = false;
    pensionDate: Date  = new Date();
    status: boolean = false;
    tarikh: string | Date;
    tugasHarianMain?: tugasHarian_Main;
}
