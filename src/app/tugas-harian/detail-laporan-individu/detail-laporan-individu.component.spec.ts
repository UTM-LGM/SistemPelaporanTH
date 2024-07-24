import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLaporanIndividuComponent } from './detail-laporan-individu.component';

describe('DetailLaporanIndividuComponent', () => {
  let component: DetailLaporanIndividuComponent;
  let fixture: ComponentFixture<DetailLaporanIndividuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailLaporanIndividuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLaporanIndividuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
