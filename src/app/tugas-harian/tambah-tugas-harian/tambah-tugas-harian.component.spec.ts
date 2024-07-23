import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahTugasHarianComponent } from './tambah-tugas-harian.component';

describe('TambahTugasHarianComponent', () => {
  let component: TambahTugasHarianComponent;
  let fixture: ComponentFixture<TambahTugasHarianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TambahTugasHarianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahTugasHarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
