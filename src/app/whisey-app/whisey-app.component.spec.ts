import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiseyAppComponent } from './whisey-app.component';

describe('WhiseyAppComponent', () => {
  let component: WhiseyAppComponent;
  let fixture: ComponentFixture<WhiseyAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhiseyAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiseyAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
