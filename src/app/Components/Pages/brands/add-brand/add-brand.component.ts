import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BrandService } from '../../../../Service/brand.service';

@Component({
  selector: 'app-add-brand',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss'] // تأكد من المسار الصحيح
})
export class AddBrandComponent implements OnInit {
  brandForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ** تم تصحيح أسماء الحقول هنا لتطابق الـ HTML والـ API **
    this.brandForm = this.fb.group({
      Name: ['', Validators.required],
      Description: [''],
      Logo: [null, Validators.required]
    });
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.brandForm.patchValue({ Logo: file });
      this.brandForm.get('Logo')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.brandForm.invalid) {
      this.brandForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const name = this.brandForm.get('Name')?.value;
    const description = this.brandForm.get('Description')?.value;
    const logo = this.brandForm.get('Logo')?.value;

    this.brandService.addBrand(name, description, logo).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => {
        this.errorMessage = err.error?.message || 'An error occurred.';
        this.isSubmitting = false;
      }
    });
  }

  get f() { return this.brandForm.controls; }
}
