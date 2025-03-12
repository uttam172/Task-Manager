import { Component } from '@angular/core';

import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { trigger, transition, style, animate } from '@angular/animations'

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})

export class TaskListComponent {
  newTask: string = ""
  tasks: { text: string; completed: boolean; priority: string }[] = []
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
      this.tasks.push({ text: this.newTask, completed: false, priority: 'medium' })
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
    if (this.filter === "completed") {
      return this.tasks.filter(task => task.completed);
    } else if (this.filter === "pending") {
      return this.tasks.filter(task => !task.completed);
    } else {
      return this.tasks;
    }
  }

  // Set filter
  setFilter(type: string) {
    this.filter = type
  }

  // Progress Percentage
  getCompletionPercentage() {
    if (this.tasks.length === 0) return 0;
    const completedTasks = this.tasks.filter(task => task.completed).length;
    return Math.round((completedTasks / this.tasks.length) * 100);
  }
}
