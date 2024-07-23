import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KemaskiniTHComponent } from './kemaskini-th.component';

describe('KemaskiniTHComponent', () => {
  let component: KemaskiniTHComponent;
  let fixture: ComponentFixture<KemaskiniTHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KemaskiniTHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KemaskiniTHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
