import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDosRoutingModule } from './to-dos-routing.module';
import { ToDosComponent } from './to-dos.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ToDoDetailComponent } from './to-do-detail/to-do-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconPillModule } from '@shared/icon-pill/icon-pill.module';


@NgModule({
  declarations: [
    ToDosComponent,
    ToDoListComponent,
    ToDoDetailComponent
  ],
  imports: [
    CommonModule,
    ToDosRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    IconPillModule
  ]
})
export class ToDosModule { }
