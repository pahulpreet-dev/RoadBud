import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddyAddComponent } from './buddy-add.component';

describe('BuddyAddComponent', () => {
  let component: BuddyAddComponent;
  let fixture: ComponentFixture<BuddyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuddyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuddyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
