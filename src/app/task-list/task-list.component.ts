import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-task-list',
  imports: [FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent {
  newTask: string = ""
  task = 'Learn Angular 19'
  taskInputPlaceholder = "Enter a new task..."
  isDisabled = true

  toggleInput() {
    this.isDisabled =!this.isDisabled
  }
}
