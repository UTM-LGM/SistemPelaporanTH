import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistDrafComponent } from './exist-draf.component';

describe('ExistDrafComponent', () => {
  let component: ExistDrafComponent;
  let fixture: ComponentFixture<ExistDrafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistDrafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistDrafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
