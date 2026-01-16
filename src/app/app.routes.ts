import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'validation', pathMatch: 'full' },

  {
    path: 'validation',
    loadComponent: () =>
      import('./validation-demo/validation-demo.component')
        .then(m => m.ValidationDemoComponent)
  },
  {
    path: 'errors',
    loadComponent: () =>
      import('./error-demo/error-demo.component')
        .then(m => m.ErrorDemo)
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth-demo/auth-demo.component')
        .then(m => m.AuthDemo)
  },
  {
    path: 'crypto',
    loadComponent: () =>
      import('./crypto-demo/crypto-demo.component')
        .then(m => m.CryptoDemo)
  },
  {
    path: 'xss',
    loadComponent: () =>
      import('./xss-demo/xss-demo.component')
        .then(m => m.XssDemo)
  },
  // 🔹 NUEVO: Products Demo
  {
    path: 'products',
    loadComponent: () =>
      import('./products-demo/products-demo.component')
        .then(m => m.ProductsDemoComponent)
  }
];
