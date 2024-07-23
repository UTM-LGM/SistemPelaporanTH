import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotisPadamComponent } from './notis-padam.component';

describe('NotisPadamComponent', () => {
  let component: NotisPadamComponent;
  let fixture: ComponentFixture<NotisPadamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotisPadamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotisPadamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
