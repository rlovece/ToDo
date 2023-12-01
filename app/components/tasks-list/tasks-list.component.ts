import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent {

  @Input() inputTasks = signal<Task[]>([]);
  @Output() emitDelete = new EventEmitter<Task>();
  @Output() emitUpdateStade = new EventEmitter<Task>();
  @Output() emitUpdateTitel = new EventEmitter<Task>();

  filter = signal<'all' |'pending' | 'completed'>('all');

  tasksByFilter= computed(() => {
    const listTask = this.inputTasks();
    const filter = this.filter();
    if (filter === 'pending'){
      return listTask.filter (task => !task.completed)
    }
    if (filter === 'completed'){
      return listTask.filter (task => task.completed)
    }
    return listTask;
  })

  delete(task: Task) {
    this.emitDelete.emit(task);
  }

  updateStade(task: Task) {
    this.emitUpdateStade.emit(task);
  }

  updateStateEditingModel(task: Task) {
    if (!task.completed) {
      this.inputTasks.update(prevState =>{
        return prevState.map( item => {
          if (item.id === task.id){
            return {
              ...item,
              editing: true
            }
          }
          return {
            ...item,
            editing: false
          }
        }

        )
      })
    }
  }

  updateTitel(task: Task, event: Event) {
    const newTitel = event.target as HTMLInputElement;
    this.inputTasks.update(prevState =>{
      return prevState.map( item => {
        if (item.id === task.id){
          item = {...item,
            titel: newTitel.value,
            editing: false}
          this.emitUpdateTitel.emit(item);
          return item
        }
        return item
       })
    })

  }

  chengeFilter(newFilter: 'all' |'pending' | 'completed') {
    this.filter.set(newFilter);
  }
}
