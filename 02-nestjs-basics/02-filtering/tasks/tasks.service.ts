import { BadRequestException, Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { isEnum } from "class-validator";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
  ): Task[] {
    let filteredTasks = [...this.tasks];

    if (
      status && !isEnum(status, TaskStatus) ||
      page && page < 0 ||
      limit && limit < 0
    ) {
      throw new BadRequestException('Bad Request');
    }

    if (status) {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }

    if (page && limit) {
      filteredTasks = filteredTasks.splice((page - 1) * limit, limit);
    }

    return filteredTasks;
  }
}
