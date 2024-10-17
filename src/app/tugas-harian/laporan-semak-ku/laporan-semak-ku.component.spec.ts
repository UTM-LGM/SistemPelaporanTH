import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanSemakKuComponent } from './laporan-semak-ku.component';

describe('LaporanSemakKuComponent', () => {
  let component: LaporanSemakKuComponent;
  let fixture: ComponentFixture<LaporanSemakKuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaporanSemakKuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanSemakKuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
