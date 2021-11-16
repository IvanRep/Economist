import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountSelectorComponent } from './amount-selector.component';

describe('AmountSelectorComponent', () => {
  let component: AmountSelectorComponent;
  let fixture: ComponentFixture<AmountSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
