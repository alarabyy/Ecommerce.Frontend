import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Pages/home/home.component';
import { CategoriesListComponent } from './Components/Pages/category/categories-list/categories-list.component';
import { LoginComponent } from './Components/Pages/auth/login/login.component';
import { RegisterComponent } from './Components/Pages/auth/register/register.component';
import { EmailConfirmationComponent } from './Components/Pages/auth/email-confirmation/email-confirmation.component';
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
import { MailsListComponent } from './Components/Pages/mails/mails-list/mails-list.component';
import { MailDetailsComponent } from './Components/Pages/mails/mail-details/mail-details.component';
import { AllOfferComponent } from './Components/Pages/Offers/all-offer/all-offer.component';
import { AddOfferItemComponent } from './Components/Pages/Offers/add-offer-item/add-offer-item.component';
import { AddOfferComponent } from './Components/Pages/Offers/add-offer/add-offer.component';
import { OfferDetailsComponent } from './Components/Pages/Offers/offer-details/offer-details.component';

export const routes: Routes = [
  // == Public Routes ==
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-email', component: EmailConfirmationComponent },

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
{ path: 'products/details/:id', component: ProductDetailsComponent, canActivate: [authGuard] },
  { path: 'products', component: ViewProductsComponent , canActivate: [authGuard] },
  { path: 'products/add', component: AddProductComponent , canActivate: [authGuard] },
  { path: 'products/edit/:id', component: EditProductComponent , canActivate: [authGuard] },


// --- Offer Management ---
{ path: 'AllOffer', component: AllOfferComponent , canActivate: [authGuard] },
{ path: 'AddOffer', component: AddOfferComponent , canActivate: [authGuard] },
{ path: 'AddOfferItem', component: AddOfferItemComponent , canActivate: [authGuard] },
{ path: 'offers', component: AllOfferComponent , canActivate: [authGuard] },
{ path: 'offer/:id', component: OfferDetailsComponent , canActivate: [authGuard] },

 // --- Mail Management ---
  { path: 'mails', component: MailsListComponent , canActivate: [authGuard] },
  { path: 'mails/reply/:id', component: MailDetailsComponent , canActivate: [authGuard] },

  // == Default and Wildcard Routes ==
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent } // <-- 2. قم بتعديل هذا السطر
];
