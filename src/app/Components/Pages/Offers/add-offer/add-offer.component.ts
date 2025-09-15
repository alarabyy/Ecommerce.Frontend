import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { forkJoin, switchMap, of } from 'rxjs';
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
  imagePreviews: string[] = []; // Can hold multiple image previews
  imageFiles: File[] = []; // Can hold multiple files
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
      images: [null, Validators.required], // Validator for the file input
      items: this.fb.array([], [Validators.required, Validators.minLength(1)])
    });
    this.addItem();
  }

  get items(): FormArray {
    return this.offerForm.get('items') as FormArray;
  }

  newItem(): FormGroup {
    return this.fb.group({
      ProductId: [null, [Validators.required, Validators.min(1)]],
      Price: [null, [Validators.required, Validators.min(0.01)]],
      Available: [0, [Validators.required, Validators.min(0)]]
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
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.imageFiles = Array.from(input.files);
      this.offerForm.patchValue({ images: this.imageFiles });
      this.offerForm.get('images')?.updateValueAndValidity();

      this.imagePreviews = []; // Clear previous previews
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  onSubmit() {
    if (this.offerForm.invalid) {
      this.offerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const { title, description, items } = this.offerForm.value;

    this.offerService.addOffer(title, description, items).pipe(
      switchMap(createResponse => {
        if (!createResponse.success || !createResponse.data) {
          throw new Error('Failed to create the offer shell.');
        }
        const newOfferId = createResponse.data;

        // If there are images to upload, create an array of upload observables
        if (this.imageFiles.length > 0) {
          const uploadObservables = this.imageFiles.map(file =>
            this.offerService.uploadOfferImage(newOfferId, file)
          );
          // Use forkJoin to execute all upload requests in parallel
          return forkJoin(uploadObservables);
        } else {
          // If no images, just return an observable of null to continue
          return of(null);
        }
      })
    ).subscribe({
      next: () => {
        this.router.navigate(['/admin/offers']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'An error occurred during the process.';
        this.isSubmitting = false;
      }
    });
  }
}
