import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Category, CategoryService } from '../../../../Service/category.service';
import { ConfirmationModalComponent } from '../../../Widgets/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmationModalComponent],
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categories$!: Observable<Category[]>;
  showDeleteModal = false;
  categoryToDeleteId: number | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categories$ = this.categoryService.getCategories();
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/50/f4f7fc/a0aec0?Text=No+Image';
  }

  openDeleteConfirmation(id: number) {
    this.categoryToDeleteId = id;
    this.showDeleteModal = true;
  }

  onDeleteConfirmed(confirmed: boolean) {
    if (confirmed && this.categoryToDeleteId) {
      this.categoryService.deleteCategory(this.categoryToDeleteId).subscribe({
        next: () => {
          this.loadCategories();
          this.closeDeleteModal();
        },
        error: (err) => {
          console.error("Deletion failed", err);
          alert("Could not delete category.");
          this.closeDeleteModal();
        }
      });
    } else {
      this.closeDeleteModal();
    }
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.categoryToDeleteId = null;
  }
}
