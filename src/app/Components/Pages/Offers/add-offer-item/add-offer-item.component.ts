import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; // استيراد HttpErrorResponse
import { OfferService } from '../../../../Service/offer.service';

@Component({
  selector: 'app-add-offer-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-offer-item.component.html',
  styleUrls: ['./add-offer-item.component.scss']
})
export class AddOfferItemComponent implements OnInit {
  offerItemForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private offerService: OfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.offerItemForm = this.fb.group({
      offerId: [null, [Validators.required, Validators.min(1)]],
      productId: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit() {
    if (this.offerItemForm.invalid) {
      this.offerItemForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.offerService.addOfferItem(this.offerItemForm.value).subscribe({
      next: (response: any) => { // تحديد النوع
        this.successMessage = response.message || 'Item added to offer successfully!';
        this.isSubmitting = false;
        setTimeout(() => this.router.navigate(['/home']), 2000);
      },
      error: (err: HttpErrorResponse) => { // تحديد النوع
        this.errorMessage = err.error?.message || 'Failed to add item.';
        this.isSubmitting = false;
        console.error(err);
      }
    });
  }

  get f() { return this.offerItemForm.controls; }
}
