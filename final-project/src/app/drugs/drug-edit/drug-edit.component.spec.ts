import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugEditComponent } from './drug-edit.component';

describe('DrugEditComponent', () => {
  let component: DrugEditComponent;
  let fixture: ComponentFixture<DrugEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrugEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrugEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
