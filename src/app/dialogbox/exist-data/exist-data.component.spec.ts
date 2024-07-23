import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistDataComponent } from './exist-data.component';

describe('ExistDataComponent', () => {
  let component: ExistDataComponent;
  let fixture: ComponentFixture<ExistDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
