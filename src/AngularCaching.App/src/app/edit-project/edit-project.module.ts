import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProjectRoutingModule } from './edit-project-routing.module';
import { EditProjectComponent } from './edit-project.component';


@NgModule({
  declarations: [
    EditProjectComponent
  ],
  imports: [
    CommonModule,
    EditProjectRoutingModule
  ]
})
export class EditProjectModule { }
