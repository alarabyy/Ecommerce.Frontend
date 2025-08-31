import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../../Service/category.service';
import { Category } from '../../../../Models/category';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categories$!: Observable<Category[]>;

  // For confirmation modal
  showDeleteModal = false;
  categoryToDeleteId: number | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categories$ = this.categoryService.getCategories();
  }

  openDeleteConfirmation(id: number) {
    this.categoryToDeleteId = id;
    this.showDeleteModal = true;
  }

  onDeleteConfirmed(confirmed: boolean) {
    if (confirmed && this.categoryToDeleteId) {
      this.categoryService.deleteCategory(this.categoryToDeleteId).subscribe(() => {
        this.loadCategories(); // Reload the list after deletion
        this.closeDeleteModal();
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
