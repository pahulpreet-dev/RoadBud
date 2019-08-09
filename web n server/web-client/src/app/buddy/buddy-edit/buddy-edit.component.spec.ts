import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddyEditComponent } from './buddy-edit.component';

describe('BuddyEditComponent', () => {
  let component: BuddyEditComponent;
  let fixture: ComponentFixture<BuddyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuddyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuddyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
