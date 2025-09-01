import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Pages/home/home.component';
import { CategoriesListComponent } from './Components/Pages/category/categories-list/categories-list.component';
import { CategoryFormComponent } from './Components/Pages/category/category-form/category-form.component';
import { LoginComponent } from './Components/Pages/auth/login/login.component';
import { RegisterComponent } from './Components/Pages/auth/register/register.component';
import { authGuard } from './guards/auth.guard';
import { ProductsListComponent } from './Components/Pages/Product/products-list/products-list.component';
import { ProductFormComponent } from './Components/Pages/Product/product-form/product-form.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: 'products', component: ProductsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/home' } ,// Or a 404 page

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


    // Dashboard Routes
  { path: 'allcategories', component: CategoriesListComponent, canActivate: [authGuard] },
  { path: 'addcategories', component: CategoryFormComponent , canActivate: [authGuard]  }, // For adding
  { path: 'categories/edit/:id', component: CategoryFormComponent , canActivate: [authGuard]  }, // For editing

    // Dashboard products
    { path: 'products', component: ProductsListComponent },
    { path: 'products/new', component: ProductFormComponent },
    { path: 'products/edit/:id', component: ProductFormComponent },
];
