import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistDataHantarComponent } from './exist-data-hantar.component';

describe('ExistDataHantarComponent', () => {
  let component: ExistDataHantarComponent;
  let fixture: ComponentFixture<ExistDataHantarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistDataHantarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistDataHantarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
