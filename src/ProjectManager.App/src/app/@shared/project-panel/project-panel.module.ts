import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectPanelComponent } from './project-panel.component';
import { RemainingDaysModule } from '@shared/remaining-days';
import { RouterModule } from '@angular/router';
import { ToDoProgressModule } from '@shared/to-do-progress/to-do-progress.module';



@NgModule({
  declarations: [
    ProjectPanelComponent
  ],
  exports: [
    ProjectPanelComponent
  ],
  imports: [
    CommonModule,
    RemainingDaysModule,
    ToDoProgressModule,
    RouterModule
  ]
})
export class ProjectPanelModule { }
