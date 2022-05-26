import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHandleRequestComponent } from './admin-handle-request.component';

describe('AdminHandleRequestComponent', () => {
  let component: AdminHandleRequestComponent;
  let fixture: ComponentFixture<AdminHandleRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHandleRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHandleRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
