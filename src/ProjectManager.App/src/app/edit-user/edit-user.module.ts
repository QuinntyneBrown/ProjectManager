import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserRoutingModule } from './edit-user-routing.module';
import { EditUserComponent } from './edit-user.component';
import { MatIconModule } from '@angular/material/icon';
import { ProjectSelectModule } from '@shared/selects/project-select/project-select.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    EditUserComponent
  ],
  imports: [
    CommonModule,
    EditUserRoutingModule,
    ProjectSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class EditUserModule { }
