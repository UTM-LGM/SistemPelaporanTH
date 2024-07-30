import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenaraiLaporanKeseluruhanComponent } from './senarai-laporan-keseluruhan.component';

describe('SenaraiLaporanKeseluruhanComponent', () => {
  let component: SenaraiLaporanKeseluruhanComponent;
  let fixture: ComponentFixture<SenaraiLaporanKeseluruhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenaraiLaporanKeseluruhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenaraiLaporanKeseluruhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
