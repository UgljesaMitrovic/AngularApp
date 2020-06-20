import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KaficComponent } from './kafic.component';

describe('KaficComponent', () => {
  let component: KaficComponent;
  let fixture: ComponentFixture<KaficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KaficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
