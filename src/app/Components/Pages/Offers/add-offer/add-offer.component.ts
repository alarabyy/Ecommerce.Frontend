import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
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
  imagePreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
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
      image: [null, Validators.required], // For the file input
      items: this.fb.array([], Validators.required)
    });
    this.addItem();
  }

  get items(): FormArray {
    return this.offerForm.get('items') as FormArray;
  }

  newItem(): FormGroup {
    return this.fb.group({
      productId: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(0.01)]]
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

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.offerForm.invalid || !this.imageFile) {
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

    this.offerService.addOffer(offerPayload).pipe(
      switchMap(response => {
        if (response.success && response.data.id && this.imageFile) {
          // If offer is created, upload the image
          return this.offerService.uploadOfferImage(response.data.id, this.imageFile);
        } else {
          throw new Error(response.message || 'Failed to create offer.');
        }
      })
    ).subscribe({
      next: () => {
        this.router.navigate(['/admin/offers']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'An error occurred.';
        this.isSubmitting = false;
      }
    });
  }
}
