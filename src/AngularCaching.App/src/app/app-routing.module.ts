import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { LayoutComponent } from '@shared/layout/layout.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {
    path: '',
    component: LayoutComponent,
    canActivate:[AuthGuard],
    children: [
      { path: '', redirectTo: 'to-dos', pathMatch: 'full'},
      {
        path: 'to-dos',
        loadChildren: () => import('./to-dos/to-dos.module').then(m => m.ToDosModule)
      },
      { path: 'promotions', loadChildren: () => import('./promotions/promotions.module').then(m => m.PromotionsModule) },
      { path: 'users/edit/current', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
      { path: 'projects/edit/current', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
    ]
  },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
