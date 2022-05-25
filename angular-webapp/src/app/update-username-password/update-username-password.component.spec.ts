import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUsernamePasswordComponent } from './update-username-password.component';

describe('UpdateUsernamePasswordComponent', () => {
  let component: UpdateUsernamePasswordComponent;
  let fixture: ComponentFixture<UpdateUsernamePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUsernamePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUsernamePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
