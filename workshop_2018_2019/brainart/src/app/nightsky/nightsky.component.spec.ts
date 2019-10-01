import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NightskyComponent } from './nightsky.component';

describe('NightskyComponent', () => {
  let component: NightskyComponent;
  let fixture: ComponentFixture<NightskyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NightskyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NightskyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
