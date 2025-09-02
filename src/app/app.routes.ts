import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Pages/home/home.component';
import { CategoriesListComponent } from './Components/Pages/category/categories-list/categories-list.component';
import { LoginComponent } from './Components/Pages/auth/login/login.component';
import { RegisterComponent } from './Components/Pages/auth/register/register.component';
import { authGuard } from './guards/auth.guard';
import { AddCategoryComponent } from './Components/Pages/category/add-category/add-category.component';
import { EditCategoryComponent } from './Components/Pages/category/edit-category/edit-category.component';
import { ViewBrandsComponent } from './Components/Pages/brands/view-brands/view-brands.component';
import { AddBrandComponent } from './Components/Pages/brands/add-brand/add-brand.component';
import { EditBrandComponent } from './Components/Pages/brands/edit-brand/edit-brand.component';
import { NotFoundComponent } from './Components/Pages/not-found/not-found.component';
import { ProductDetailsComponent } from './Components/Pages/Product/product-details/product-details.component';
import { ViewProductsComponent } from './Components/Pages/Product/view-products/view-products.component';
import { AddProductComponent } from './Components/Pages/Product/add-product/add-product.component';
import { EditProductComponent } from './Components/Pages/Product/edit-product/edit-product.component';

export const routes: Routes = [
  // == Public Routes ==
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // == Dashboard Routes (Protected Individually) ==

  // --- Category Management ---
  { path: 'categories', component: CategoriesListComponent, canActivate: [authGuard] },
  { path: 'categories/new', component: AddCategoryComponent, canActivate: [authGuard] },
  { path: 'categories/edit/:id', component: EditCategoryComponent, canActivate: [authGuard] },

  // --- Brand Management ---
  { path: 'brands', component: ViewBrandsComponent, canActivate: [authGuard] },
  { path: 'brands/add', component: AddBrandComponent, canActivate: [authGuard] },
  { path: 'brands/edit/:id', component: EditBrandComponent, canActivate: [authGuard] },

  // --- Product Details and Management ---
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'products', component: ViewProductsComponent },
  { path: 'products/add', component: AddProductComponent },
  { path: 'products/edit/:id', component: EditProductComponent },

  // == Default and Wildcard Routes ==
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent } // <-- 2. قم بتعديل هذا السطر
];
