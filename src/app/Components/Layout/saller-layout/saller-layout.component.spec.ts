import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SallerLayoutComponent } from './saller-layout.component';

describe('SallerLayoutComponent', () => {
  let component: SallerLayoutComponent;
  let fixture: ComponentFixture<SallerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SallerLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SallerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
