import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsBalanceComponent } from './transactions-balance.component';

describe('TransactionsBalanceComponent', () => {
  let component: TransactionsBalanceComponent;
  let fixture: ComponentFixture<TransactionsBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
