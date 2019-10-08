import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftToolComponent } from './left-tool.component';

describe('LeftToolComponent', () => {
  let component: LeftToolComponent;
  let fixture: ComponentFixture<LeftToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
