import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenaraiDerafpembetulanComponent } from './senarai-derafpembetulan.component';

describe('SenaraiDerafpembetulanComponent', () => {
  let component: SenaraiDerafpembetulanComponent;
  let fixture: ComponentFixture<SenaraiDerafpembetulanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenaraiDerafpembetulanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenaraiDerafpembetulanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
