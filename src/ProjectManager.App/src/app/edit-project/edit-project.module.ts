import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProjectRoutingModule } from './edit-project-routing.module';
import { EditProjectComponent } from './edit-project.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    EditProjectComponent
  ],
  imports: [
    CommonModule,
    EditProjectRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule
  ]
})
export class EditProjectModule { }
