import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLulusThComponent } from './detail-lulus-th.component';

describe('DetailLulusThComponent', () => {
  let component: DetailLulusThComponent;
  let fixture: ComponentFixture<DetailLulusThComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailLulusThComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLulusThComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
