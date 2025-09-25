import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    title: 'Danh sách sản phẩm',
    loadComponent: () => import('./pages/product-list-component/product-list-component')
      .then(m => m.ProductListComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail-component/product-detail-component')
      .then(m => m.ProductDetailComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/product-list-component/product-list-component')
      .then(m => m.ProductListComponent)
  }
];
