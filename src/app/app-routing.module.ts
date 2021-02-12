import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
    { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
    { path: 'list', loadChildren: () => import('./products/list/list.module').then(m => m.ListModule) },
    { path: 'details', loadChildren: () => import('./products/details/details.module').then(m => m.DetailsModule) },
    { path: 'edit', loadChildren: () => import('./products/edit/edit.module').then(m => m.EditModule) },
    { path: 'new', loadChildren: () => import('./products/new/new.module').then(m => m.NewModule) },
    { path: 'listCategory', loadChildren: () => import('./categories/list/list.module').then(m => m.ListModule) },
    { path: 'detailsCategory', loadChildren: () => import('./categories/details/details.module').then(m => m.DetailsModule) },
    { path: 'editCategory', loadChildren: () => import('./categories/edit/edit.module').then(m => m.EditModule) },
    { path: 'newCategory', loadChildren: () => import('./categories/new/new.module').then(m => m.NewModule) },
    { path: 'cart', loadChildren: () => import('./products/cart/cart.module').then(m => m.CartModule) },
    { path: 'checkout', loadChildren: () => import('./products/checkout/checkout.module').then(m => m.CheckoutModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
