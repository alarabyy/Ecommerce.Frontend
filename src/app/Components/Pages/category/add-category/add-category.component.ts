import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../../Service/category.service'; // تأكد من المسار

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'] // تأكد من المسار
})
export class AddCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    // ** تم تصحيح أسماء الحقول هنا لتطابق الـ HTML والـ API **
    this.categoryForm = this.fb.group({
      Name: ['', Validators.required],
      Description: [''],
      Image: [null, Validators.required]
    });
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.categoryForm.patchValue({ Image: file });
      this.categoryForm.get('Image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    // الآن سنرسل البيانات كمتغيرات منفصلة كما تتوقع الخدمة
    const name = this.categoryForm.get('Name')?.value;
    const description = this.categoryForm.get('Description')?.value;
    const image = this.categoryForm.get('Image')?.value;

    this.categoryService.addCategory(name, description, image).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/categories']);
      },
      error: (err) => {
        console.error('Category creation failed:', err);
        this.errorMessage = err.error?.title || 'An error occurred.';
        this.isSubmitting = false;
      }
    });
  }

  get f() { return this.categoryForm.controls; }
}
