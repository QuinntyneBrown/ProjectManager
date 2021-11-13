import { Component, OnInit } from '@angular/core';
import { ToDoService } from '@api';
import { Cache } from '@core/stateful-services/cache';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.scss']
})
export class ToDosComponent  { }
