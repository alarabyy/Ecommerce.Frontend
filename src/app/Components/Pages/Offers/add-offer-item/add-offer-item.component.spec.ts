import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfferItemComponent } from './add-offer-item.component';

describe('AddOfferItemComponent', () => {
  let component: AddOfferItemComponent;
  let fixture: ComponentFixture<AddOfferItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOfferItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOfferItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
