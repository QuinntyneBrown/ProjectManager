import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProjectRoutingModule } from './edit-project-routing.module';
import { EditProjectComponent } from './edit-project.component';
import { MatIconModule } from '@angular/material/icon';
import { ProjectSelectModule } from '@shared/selects/project-select/project-select.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    EditProjectComponent
  ],
  imports: [
    CommonModule,
    EditProjectRoutingModule,
    ProjectSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class EditProjectModule { }
