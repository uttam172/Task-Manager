import { Component } from '@angular/core';

import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  imports: [CommonModule, FormsModule]
})

export class TaskListComponent {
  newTask: string = ""
  tasks: { text: string; completed: boolean }[] = []
  filter: string = 'all'

  constructor() {
    this.loadTasks()
  }

  // Save tasks to local Storage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  // Load tasks from Local Storage
  loadTasks() {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks)
    }
  }

  // Add Tasks
  addTask() {
    if (this.newTask.trim() !== "") {
      this.tasks.push({ text: this.newTask, completed: false })
      this.newTask = ""
      this.saveTasks()
    }
  }

  // Remove Tasks
  removeTask(index: number) {
    this.tasks.splice(index, 1)
    this.saveTasks()
  }

  // Toggle Task Completion
  toggleTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed
    this.saveTasks()
  }

  // Filter task list based on selected filter
  getFilteredTasks() {
    switch (this.filter) {
      case 'completed':
        return this.tasks.filter(task => task.completed);
      case 'pending':
        return this.tasks.filter(task => !task.completed);
      default:
        return this.tasks;
    }
  }

  // Set filter
  setFilter(type: string) {
    this.filter = type
  }
}
