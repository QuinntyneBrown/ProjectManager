import { Component, Input } from '@angular/core';
import { Project } from '@api';

@Component({
  selector: 'app-remaining-days',
  templateUrl: './remaining-days.component.html',
  styleUrls: ['./remaining-days.component.scss']
})
export class RemainingDaysComponent {

  public get days() {
    let dueDate = new Date(this.project.dueDate) as any;
    let today = new Date() as any;
    const diffTime = Math.abs(today - dueDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  @Input() public project!: Project

}
