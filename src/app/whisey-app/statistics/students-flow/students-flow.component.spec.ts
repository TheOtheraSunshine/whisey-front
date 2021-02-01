import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsFlowComponent } from './students-flow.component';

describe('StudentsFlowComponent', () => {
  let component: StudentsFlowComponent;
  let fixture: ComponentFixture<StudentsFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
