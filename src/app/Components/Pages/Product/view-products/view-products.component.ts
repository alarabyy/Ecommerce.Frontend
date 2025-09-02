import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Product, ProductService } from '../../../../Service/product.service';
import { ConfirmationModalComponent } from '../../../Widgets/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmationModalComponent],
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  products$!: Observable<Product[]>;
  showDeleteModal = false;
  itemToDeleteId: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products$ = this.productService.getProducts();
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/50';
  }

  openDeleteConfirmation(id: number) {
    this.itemToDeleteId = id;
    this.showDeleteModal = true;
  }

  onDeleteConfirmed(confirmed: boolean) {
    if (confirmed && this.itemToDeleteId) {
      this.productService.deleteProduct(this.itemToDeleteId).subscribe({
        next: () => {
          this.loadProducts();
          this.closeDeleteModal();
        },
        error: (err) => {
          console.error("Deletion failed:", err);
          alert("Could not delete the product.");
          this.closeDeleteModal();
        }
      });
    } else {
      this.closeDeleteModal();
    }
  }

  closeDeleteModal() {
    this.itemToDeleteId = null;
    this.showDeleteModal = false;
  }
}
