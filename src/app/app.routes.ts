import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Pages/home/home.component';
import { CategoriesListComponent } from './Components/Pages/category/categories-list/categories-list.component';
import { LoginComponent } from './Components/Pages/auth/login/login.component';
import { RegisterComponent } from './Components/Pages/auth/register/register.component';
import { authGuard } from './guards/auth.guard';
import { ProductsListComponent } from './Components/Pages/Product/products-list/products-list.component';
import { ProductFormComponent } from './Components/Pages/Product/product-form/product-form.component';
import { AddCategoryComponent } from './Components/Pages/category/add-category/add-category.component';
import { EditCategoryComponent } from './Components/Pages/category/edit-category/edit-category.component';
import { ViewBrandsComponent } from './Components/Pages/brands/view-brands/view-brands.component';
import { AddBrandComponent } from './Components/Pages/brands/add-brand/add-brand.component';
import { EditBrandComponent } from './Components/Pages/brands/edit-brand/edit-brand.component';
import { NotFoundComponent } from './Components/Pages/not-found/not-found.component';

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

  // --- Product Management ---
  { path: 'products', component: ProductsListComponent, canActivate: [authGuard] },
  { path: 'products/new', component: ProductFormComponent, canActivate: [authGuard] },
  { path: 'products/edit/:id', component: ProductFormComponent, canActivate: [authGuard] },

  // --- Brand Management ---
  { path: 'brands', component: ViewBrandsComponent, canActivate: [authGuard] },
  { path: 'brands/add', component: AddBrandComponent, canActivate: [authGuard] },
  { path: 'brands/edit/:id', component: EditBrandComponent, canActivate: [authGuard] },

  // == Default and Wildcard Routes ==
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent } // <-- 2. قم بتعديل هذا السطر
];
