import { Task } from "./../../model/task";
import { CrudService } from "./../../service/crud.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  task: Task = new Task();
  taskArr: Task[] = [];
  addTaskValue: string = "";
  editTaskValue: string = "";

  constructor(private CrudService: CrudService) {}

  ngOnInit() {
    this.getAllTask();
    this.addTaskValue = "";
    this.task = new Task();
    this.editTaskValue = "";
    this.taskArr = [];
  }

  getAllTask(): void {
    this.CrudService.getAll().subscribe({
      next: (res) => (this.taskArr = res),
      error: (err) => console.log("could not get all tasks"),
    });
  }

  addTask(): void {
    this.task.taskName = this.addTaskValue;
    this.CrudService.addTask(this.task).subscribe({
      next: (res) => this.ngOnInit(),
      error: (err) => console.log("could not add new task"),
    });
  }

  deleteTask(task: Task) {
    this.CrudService.deleteTask(task).subscribe({
      next: (res) => this.ngOnInit(),
      error: (err) => console.log("could not delete task"),
    });
  }

  editTask(): void {
    this.task.id
    this.task.taskName = this.editTaskValue;
    this.CrudService.editTask(this.task).subscribe({
      next: (res) => this.ngOnInit(),
      error: (err) => console.log("could not edit task"),
    });
  }

  setTask(task: Task) {
    this.task = task;
  }
}
