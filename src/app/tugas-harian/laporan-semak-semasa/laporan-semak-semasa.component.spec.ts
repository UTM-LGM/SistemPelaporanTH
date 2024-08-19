import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanSemakSemasaComponent } from './laporan-semak-semasa.component';

describe('LaporanSemakSemasaComponent', () => {
  let component: LaporanSemakSemasaComponent;
  let fixture: ComponentFixture<LaporanSemakSemasaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaporanSemakSemasaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanSemakSemasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
