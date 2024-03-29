import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDosComponent } from './to-dos.component';

const routes: Routes = [
  {
    path: '',
    component: ToDosComponent
  },
  { path: 'create', component: ToDosComponent },
  { path: 'edit/:toDoId', component: ToDosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToDosRoutingModule { }
