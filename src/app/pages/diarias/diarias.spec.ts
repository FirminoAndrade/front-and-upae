import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Diarias } from './diarias';

describe('Diarias', () => {
  let component: Diarias;
  let fixture: ComponentFixture<Diarias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Diarias],
    }).compileComponents();

    fixture = TestBed.createComponent(Diarias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
