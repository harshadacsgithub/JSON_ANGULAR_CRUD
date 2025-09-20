import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentByIdComponent } from './view-student-by-id.component';

describe('ViewStudentByIdComponent', () => {
  let component: ViewStudentByIdComponent;
  let fixture: ComponentFixture<ViewStudentByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStudentByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
