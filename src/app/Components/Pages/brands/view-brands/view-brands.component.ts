import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationModalComponent } from '../../../Widgets/confirmation-modal/confirmation-modal.component';
import { Brand, BrandService } from '../../../../Service/brand.service';

@Component({
  selector: 'app-view-brands',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmationModalComponent],
  templateUrl: './view-brands.component.html',
  styleUrls: ['./view-brands.component.scss']
})
export class ViewBrandsComponent implements OnInit {
  brands$!: Observable<Brand[]>;
  showDeleteModal = false;
  itemToDeleteId: number | null = null;

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.brands$ = this.brandService.getBrands();
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
  }

  openDeleteConfirmation(id: number) {
    this.itemToDeleteId = id;
    this.showDeleteModal = true;
  }

  onDeleteConfirmed(confirmed: boolean) {
    if (confirmed && this.itemToDeleteId) {
      this.brandService.deleteBrand(this.itemToDeleteId).subscribe(() => {
        this.loadBrands();
        this.closeDeleteModal();
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
