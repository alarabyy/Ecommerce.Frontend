import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CategoryService } from '../../../../Service/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  isEditMode = false;
  currentCategoryId: number | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
    this.checkEditMode();
  }

  private initForm() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [null] // No validator for image initially
    });
  }

  private checkEditMode() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.currentCategoryId = +id;
          // In edit mode, image is not required
          this.categoryForm.get('image')?.clearValidators();
          return this.categoryService.getCategoryById(this.currentCategoryId);
        }
        // In add mode, image is required
        this.categoryForm.get('image')?.setValidators([Validators.required]);
        return [];
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
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.categoryForm.patchValue({ image: file });

      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }

    const { name, description, image } = this.categoryForm.value;

    if (this.isEditMode && this.currentCategoryId) {
      this.categoryService.updateCategory(this.currentCategoryId, name, description, image)
        .subscribe(() => this.router.navigate(['/dashboard/categories']));
    } else {
      this.categoryService.addCategory(name, description, image)
        .subscribe(() => this.router.navigate(['/dashboard/categories']));
    }
  }
}
