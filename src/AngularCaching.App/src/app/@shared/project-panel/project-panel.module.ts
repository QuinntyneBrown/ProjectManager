import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectPanelComponent } from './project-panel.component';



@NgModule({
  declarations: [
    ProjectPanelComponent
  ],
  exports: [
    ProjectPanelComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProjectPanelModule { }
