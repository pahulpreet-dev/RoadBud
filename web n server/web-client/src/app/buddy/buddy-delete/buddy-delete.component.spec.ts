import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddyDeleteComponent } from './buddy-delete.component';

describe('BuddyDeleteComponent', () => {
  let component: BuddyDeleteComponent;
  let fixture: ComponentFixture<BuddyDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuddyDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuddyDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
