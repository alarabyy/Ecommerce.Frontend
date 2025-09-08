import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOfferItemComponent } from './all-offer-item.component';

describe('AllOfferItemComponent', () => {
  let component: AllOfferItemComponent;
  let fixture: ComponentFixture<AllOfferItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllOfferItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOfferItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
