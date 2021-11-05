import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'to-dos', pathMatch: 'full'},
  { path: 'to-dos', loadChildren: () => import('./to-dos/to-dos.module').then(m => m.ToDosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
