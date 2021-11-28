import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoProgressComponent } from './to-do-progress.component';



@NgModule({
  declarations: [
    ToDoProgressComponent
  ],
  exports: [
    ToDoProgressComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ToDoProgressModule { }
