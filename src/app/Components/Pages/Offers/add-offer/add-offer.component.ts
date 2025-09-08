import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { OfferService } from '../../../../Service/offer.service';

@Component({
  selector: 'app-add-offer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {
  offerForm!: FormGroup;
  errorMessage: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private offerService: OfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.offerForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      items: this.fb.array([])
    });
    this.addItem();
  }

  get items(): FormArray {
    return this.offerForm.get('items') as FormArray;
  }

  newItem(): FormGroup {
    return this.fb.group({
      productId: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  addItem() {
    this.items.push(this.newItem());
  }

  removeItem(index: number) {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  // --- *** هذا هو الجزء الذي تم تعديله بالكامل *** ---
  onSubmit() {
    if (this.offerForm.invalid) {
      this.offerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const offerPayload = {
      title: this.offerForm.get('title')?.value,
      description: this.offerForm.get('description')?.value,
      items: this.offerForm.get('items')?.value
    };

    this.offerService.addOffer(offerPayload).subscribe({
      next: () => {
        // Navigate to the offers list page (assuming it exists)
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'An error occurred while creating the offer.';
        this.isSubmitting = false;
      }
    });
  }
}
