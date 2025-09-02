import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Category, CategoryService } from '../../../../Service/category.service';
import { ProductService } from '../../../../Service/product.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  currentProductId!: number;
  imagePreview: string | ArrayBuffer | null = null;
  categories$!: Observable<Category[]>;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: [null, Validators.required],
      image: [null]
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          this.router.navigate(['/products']);
          return of(null);
        }
        this.currentProductId = +id;
        return this.productService.getProductById(this.currentProductId);
      })
    ).subscribe(product => {
      if (product) {
        this.productForm.patchValue(product);
        this.imagePreview = product.imageUrl;
      }
    });
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    Object.keys(this.productForm.controls).forEach(key => {
      const controlValue = this.productForm.get(key)?.value;
      if (controlValue) {
        formData.append(key, controlValue);
      }
    });

    this.productService.updateProduct(this.currentProductId, formData)
      .subscribe(() => this.router.navigate(['/products']));
  }
}
