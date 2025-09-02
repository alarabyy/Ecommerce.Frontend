import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../../Service/category.service';
import { switchMap, of } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  currentCategoryId!: number;
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      image: [null]
    });
    this.loadCategoryData();
  }

  private loadCategoryData() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          this.router.navigate(['/dashboard/categories']);
          return of(null);
        }
        this.currentCategoryId = +id;
        return this.categoryService.getCategoryById(this.currentCategoryId);
      })
    ).subscribe(category => {
      if (category) {
        this.categoryForm.patchValue({
          name: category.name,
          description: category.description,
        });
        this.imagePreview = category.imageUrl;
      }
    });
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.categoryForm.patchValue({ image: file });
    }
  }

  onSubmit() {
    if (this.categoryForm.invalid) return;
    this.errorMessage = null;

    // ** تم تصحيح طريقة الاستدعاء هنا **
    const { name, description, image } = this.categoryForm.value;
    this.categoryService.updateCategory(this.currentCategoryId, name, description, image)
      .subscribe({
        next: () => this.router.navigate(['/dashboard/categories']),
        error: (err) => this.errorMessage = err.error || 'Update failed.'
      });
  }
}
