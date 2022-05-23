import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomistAppComponent } from './economist-app.component';

describe('EconomistAppComponent', () => {
  let component: EconomistAppComponent;
  let fixture: ComponentFixture<EconomistAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EconomistAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomistAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
