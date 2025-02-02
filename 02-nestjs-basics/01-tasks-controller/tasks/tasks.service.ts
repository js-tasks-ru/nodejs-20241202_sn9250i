import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private id: number = 1;

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    if (this.tasks.findIndex(task => task.id === id) !== -1) {
      return this.tasks.find((task) => task.id === id);
    } else {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  createTask(task: Task): Task {

    const newTask = {id: `${this.id++}`, ...task};
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, update: Task): Task {
    let updatedTask = null;

    this.tasks.forEach((task, index) => {
      if (task.id === id) {
        this.tasks[index] = { ...task, ...update };
        updatedTask = this.tasks[index];
      }
    });

    if (!updatedTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return updatedTask;
  }

  deleteTask(id: string): Task {
    let deletedTask = null;

    this.tasks.forEach((task, index) => {
      if (task.id === id) {
        deletedTask = this.tasks.splice(index, 1)[0];
      }
    });

    if (!deletedTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return deletedTask;
  }
}
