import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KelulusanTHComponent } from './kelulusan-th.component';

describe('KelulusanTHComponent', () => {
  let component: KelulusanTHComponent;
  let fixture: ComponentFixture<KelulusanTHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KelulusanTHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KelulusanTHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
