import React from "react";
import { tasksService } from "@/services/tasks.service";
import TasksClient from "@/features/tasks/components/TasksClient";

export default async function TasksPage() {
  const tasks = await tasksService.getTasks();

  return <TasksClient initialTasks={tasks} />;
}
