import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenaraiLaporanTHIndividuComponent } from './senarai-laporan-th-individu.component';

describe('SenaraiLaporanTHIndividuComponent', () => {
  let component: SenaraiLaporanTHIndividuComponent;
  let fixture: ComponentFixture<SenaraiLaporanTHIndividuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenaraiLaporanTHIndividuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenaraiLaporanTHIndividuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
