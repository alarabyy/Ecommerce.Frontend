import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOfferComponent } from './all-offer.component';

describe('AllOfferComponent', () => {
  let component: AllOfferComponent;
  let fixture: ComponentFixture<AllOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
