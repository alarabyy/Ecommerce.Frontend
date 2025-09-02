import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { BrandService } from '../../../../Service/brand.service';

@Component({
  selector: 'app-edit-brand',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss'] // استخدام ملف التصميم المشترك
})
export class EditBrandComponent implements OnInit {
  brandForm!: FormGroup;
  currentBrandId!: number;
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;
  isSubmitting = false; // لمنع الضغط المتكرر على الزر

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // تهيئة النموذج أولاً
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      logo: [null] // حقل الصورة اختياري عند التعديل
    });

    // ثم تحميل البيانات
    this.loadBrandData();
  }

  // هذه الدالة تجلب بيانات الماركة بناءً على الـ ID من الرابط
  private loadBrandData(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          // إذا لم يكن هناك ID، العودة إلى صفحة القائمة
          this.router.navigate(['/dashboard/brands']);
          return of(null);
        }
        this.currentBrandId = +id;
        return this.brandService.getBrandById(this.currentBrandId);
      })
    ).subscribe(brand => {
      if (brand) {
        // ملء النموذج بالبيانات القادمة من الـ API
        this.brandForm.patchValue({
          name: brand.name,
          description: brand.description
        });
        // عرض الصورة الحالية
        this.imagePreview = brand.imageUrl;
      }
    });
  }

  // هذه الدالة تعمل عند اختيار ملف صورة جديد
  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.brandForm.patchValue({ logo: file });
      // عرض معاينة للصورة الجديدة
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  // هذه الدالة تعمل عند الضغط على زر "Update Brand"
  onSubmit(): void {
    if (this.brandForm.invalid) {
      this.brandForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const { name, description, logo } = this.brandForm.value;

    this.brandService.updateBrand(this.currentBrandId, name, description, logo)
      .subscribe({
        next: () => {
          // عند النجاح، العودة إلى صفحة قائمة الماركات
          this.router.navigate(['/dashboard/brands']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Update failed. Please try again.';
          this.isSubmitting = false; // إعادة تفعيل الزر عند حدوث خطأ
        }
      });
  }

  // دالة مساعدة للوصول السهل إلى حقول النموذج في الـ HTML
  get f() { return this.brandForm.controls; }
}
