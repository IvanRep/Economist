import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportWindowComponent } from './import-window.component';

describe('ImportWindowComponent', () => {
  let component: ImportWindowComponent;
  let fixture: ComponentFixture<ImportWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
