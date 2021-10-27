import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'to-dos', pathMatch: 'full'},
  { path: 'to-dos', loadChildren: () => import('./to-do-list/to-do-list.module').then(m => m.ToDoListModule) },
  { path: 'to-dos/create', loadChildren: () => import('./to-do/to-do.module').then(m => m.ToDoModule) },
  { path: 'to-dos/edit/:toDoId', loadChildren: () => import('./to-do/to-do.module').then(m => m.ToDoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
