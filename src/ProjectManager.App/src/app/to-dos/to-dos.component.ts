import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ToDoDetailComponent } from './to-do-detail/to-do-detail.component';

@Component({
  selector: 'app-to-dos',
  standalone: true,
  imports: [
    CommonModule,
    ToDoListComponent, 
    ToDoDetailComponent
  ],
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDosComponent  { }
