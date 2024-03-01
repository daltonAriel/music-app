import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackdropModalComponent } from './backdrop-modal.component';

describe('BackdropModalComponent', () => {
  let component: BackdropModalComponent;
  let fixture: ComponentFixture<BackdropModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BackdropModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackdropModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
