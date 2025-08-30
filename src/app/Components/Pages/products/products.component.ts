import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product, ProductService } from '../../../Service/product.service';
import { ProductCardComponent } from '../../Widgets/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  allProducts$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.allProducts$ = this.productService.getProducts();
  }
}
