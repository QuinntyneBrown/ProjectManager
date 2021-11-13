import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectPanelComponent } from './project-panel.component';
import { RemainingDaysModule } from '@shared/remaining-days';
import { RouterModule } from '@angular/router';



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
    RouterModule
  ]
})
export class ProjectPanelModule { }
