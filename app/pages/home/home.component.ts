import { Component, computed, signal } from '@angular/core';
import { Task } from '../../models/Task';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  jsonList: Task[] = [];
  tasks = signal<Task[]>([])

  constructor(
    private serviceTasks: TasksService
  ){}

  ngOnInit(){
    this.getAll();
  }

  getAll(){
    this.serviceTasks.getAll()
    .subscribe(
      {
        next: (data) =>{
          this.tasks.update((tasks) => [...tasks, ...data]);
        } ,
        error: (e) => console.log(e)
      }
    )
  }

  addTask(newTask: Task) {
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(task: Task) {
    this.serviceTasks.delete(task.id)
    .subscribe(
      {
        next: () =>{
          this.tasks.update((tasks) => tasks.filter((item) => item.id!==task.id));
        },
        error: (e) => console.log(e)
      }
    )
  }

  updateStadeTask(task: Task) {
    task.completed = !task.completed;
    this.serviceTasks.update(task.id, task)
    .subscribe(
      {
        next: () =>{
          alert (`Tara: ${task.titel} cambio de estado!`);
          /* NO NECESITO HACER ESTO PQ LO PASE CON EMIT
          this.tasks.update((lista) => {
            return lista.map(item =>{
              if (item.id === task.id){
                item.completed = !item.completed;
              }
              return item
              })
          })*/
        },
        error: (e) => console.log(e)
      }
    )
  }

  updateTitelTask(task: Task) {
    this.serviceTasks.update(task.id, task)
    .subscribe(
      {
        next: () =>{
          alert (`Tara: ${task.titel} cambio!`);
        },
        error: (e) => console.log(e)
      }
    )

  }
}
