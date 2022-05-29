import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssignCoinsComponent } from './admin-assign-coins.component';

describe('AdminAssignCoinsComponent', () => {
  let component: AdminAssignCoinsComponent;
  let fixture: ComponentFixture<AdminAssignCoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssignCoinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssignCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
