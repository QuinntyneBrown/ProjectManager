import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) 
  },
  {
    path: '',
    loadComponent: () => import('./@shared/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'to-dos', pathMatch: 'full' },
      {
        path: 'to-dos',
        loadComponent: () => import('./to-dos/to-dos.component').then(m => m.ToDosComponent)
      },
      { 
        path: 'promotions', 
        loadComponent: () => import('./promotions/promotions.component').then(m => m.PromotionsComponent) 
      },
      { 
        path: 'edit-project', 
        loadComponent: () => import('./edit-project/edit-project.component').then(m => m.EditProjectComponent) 
      },
      { 
        path: 'edit-user', 
        loadComponent: () => import('./edit-user/edit-user.component').then(m => m.EditUserComponent) 
      }
    ]
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) 
  },
];
