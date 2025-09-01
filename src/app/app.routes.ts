import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Pages/home/home.component';
import { ProductsComponent } from './Components/Pages/products/products.component';
import { CategoriesListComponent } from './Components/Pages/category/categories-list/categories-list.component';
import { CategoryFormComponent } from './Components/Pages/category/category-form/category-form.component';
import { LoginComponent } from './Components/Pages/auth/login/login.component';
import { RegisterComponent } from './Components/Pages/auth/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/home' } ,// Or a 404 page

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


    // Dashboard Routes
  { path: 'allcategories', component: CategoriesListComponent, canActivate: [authGuard] },
  { path: 'addcategories', component: CategoryFormComponent , canActivate: [authGuard]  }, // For adding
  { path: 'categories/edit/:id', component: CategoryFormComponent , canActivate: [authGuard]  }, // For editing


];
