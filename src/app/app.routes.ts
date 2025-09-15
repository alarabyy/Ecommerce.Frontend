import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';


// Import all your page components here...
import { HomeComponent } from './Components/Pages/home/home.component';
import { LoginComponent } from './Components/Pages/auth/login/login.component';
import { RegisterComponent } from './Components/Pages/auth/register/register.component';
import { EmailConfirmationComponent } from './Components/Pages/auth/email-confirmation/email-confirmation.component';
import { NotFoundComponent } from './Components/Pages/not-found/not-found.component';
import { CategoriesListComponent } from './Components/Pages/category/categories-list/categories-list.component';
import { AddCategoryComponent } from './Components/Pages/category/add-category/add-category.component';
import { EditCategoryComponent } from './Components/Pages/category/edit-category/edit-category.component';
import { ViewBrandsComponent } from './Components/Pages/brands/view-brands/view-brands.component';
import { AddBrandComponent } from './Components/Pages/brands/add-brand/add-brand.component';
import { EditBrandComponent } from './Components/Pages/brands/edit-brand/edit-brand.component';
import { ProductDetailsComponent } from './Components/Pages/Product/product-details/product-details.component';
import { ViewProductsComponent } from './Components/Pages/Product/view-products/view-products.component';
import { AddProductComponent } from './Components/Pages/Product/add-product/add-product.component';
import { EditProductComponent } from './Components/Pages/Product/edit-product/edit-product.component';
import { MailsListComponent } from './Components/Pages/mails/mails-list/mails-list.component';
import { MailDetailsComponent } from './Components/Pages/mails/mail-details/mail-details.component';
import { AllOffersComponent } from './Components/Pages/Offers/all-offer/all-offer.component';
import { AddOfferComponent } from './Components/Pages/Offers/add-offer/add-offer.component';
import { OfferDetailsComponent } from './Components/Pages/Offers/offer-details/offer-details.component';
import { AdminLayoutComponent } from './Components/Layout/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './Components/Layout/public-layout/public-layout.component';
import { SallerLayoutComponent } from './Components/Layout/saller-layout/saller-layout.component';
import { WishlistComponent } from './Components/Pages/wishlist/wishlist.component';
import { RolesListComponent } from './Components/Pages/roles/roles-list/roles-list.component';
import { RoleFormComponent } from './Components/Pages/roles/role-form/role-form.component';
import { EditRolePermissionsComponent } from './Components/Pages/roles/edit-role-permissions/edit-role-permissions.component';

export const routes: Routes = [
  // --- Route Group 1: Admin Layout (Protected) ---
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate:[authGuard],
    children: [


          // Product Management
      { path: 'products', component: ViewProductsComponent },
      { path: 'products/add', component: AddProductComponent },
      { path: 'products/edit/:id', component: EditProductComponent },
      { path: 'products/details/:id', component: ProductDetailsComponent },

      // Category Management
      { path: 'categories', component: CategoriesListComponent },
      { path: 'categories/new', component: AddCategoryComponent },
      { path: 'categories/edit/:id', component: EditCategoryComponent },

      // Brand Management
      { path: 'brands', component: ViewBrandsComponent },
      { path: 'brands/add', component: AddBrandComponent },
      { path: 'brands/edit/:id', component: EditBrandComponent },

      // Offer Management
      { path: 'offers', component: AllOffersComponent },
      { path: 'offers/new', component: AddOfferComponent },
      { path: 'offer/:id', component: OfferDetailsComponent },

      { path: 'wishlist', component: WishlistComponent, canActivate: [authGuard] },


      // Mail Management
      { path: 'mails', component: MailsListComponent },
      { path: 'mails/reply/:id', component: MailDetailsComponent },


      // --- Role Management ---
      { path: 'roles', component: RolesListComponent },
      { path: 'roles/new', component: RoleFormComponent },
      { path: 'roles/edit/:id', component: EditRolePermissionsComponent },

      // Default dashboard route
      { path: '', redirectTo: 'categories', pathMatch: 'full' }
    ]
  },

  // --- Route Group 2: Public Layout ---
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  // --- Route Group 3: Saller Layout ---
  {
    path: 'Saller',
    component: SallerLayoutComponent,
    children: [
      // { path: 'home', component: HomeComponent },
    ]
  },


  // --- Fullscreen Routes (No Layout) ---
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-email', component: EmailConfirmationComponent },

  // --- Wildcard Route for 404 ---
  { path: '**', component: NotFoundComponent }
];
