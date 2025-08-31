import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Pages/home/home.component';
import { ProductsComponent } from './Components/Pages/products/products.component';
import { CategoriesListComponent } from './Components/Pages/category/categories-list/categories-list.component';
import { CategoryFormComponent } from './Components/Pages/category/category-form/category-form.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/home' } ,// Or a 404 page


    // Dashboard Routes
  { path: 'dashboard/categories', component: CategoriesListComponent },
  { path: 'dashboard/categories/new', component: CategoryFormComponent }, // For adding
  { path: 'dashboard/categories/edit/:id', component: CategoryFormComponent }, // For editing


];
