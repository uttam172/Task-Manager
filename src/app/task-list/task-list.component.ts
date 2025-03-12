import { Component } from '@angular/core';

import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent {
  newTask: string = ""
  tasks: { text: string; completed: boolean } [] = []
  
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
}
