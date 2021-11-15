import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ToDo } from '@api';

@Component({
  selector: 'app-to-do-progress',
  templateUrl: './to-do-progress.component.html',
  styleUrls: ['./to-do-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoProgressComponent {

  @Input() public toDos!: ToDo[];

  get completed() {
    return this.toDos.filter(x => x.status == 'Complete').length;
  }
}
