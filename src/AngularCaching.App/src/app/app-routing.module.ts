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
      { path: 'edit-project', loadChildren: () => import('./edit-project/edit-project.module').then(m => m.EditProjectModule) },
      { path: 'edit-user', loadChildren: () => import('./edit-user/edit-user.module').then(m => m.EditUserModule) }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
