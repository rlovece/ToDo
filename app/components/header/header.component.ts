import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/Task';
import { TasksService } from '../../services/tasks.service';
import { NonNullAssert } from '@angular/compiler';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  @Output() EmitAddTask = new EventEmitter<Task>();

   newTaskCtrol = new FormControl(
    '',{
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(5),
      ]
    }
   );

  constructor(
     private taskServices: TasksService,
  ){}

  changeHandler() {
    if (this.newTaskCtrol.valid){
      const value = this.newTaskCtrol.value.trim();
      // trim() borra espacios al principio y al final, luego vuelvo a verf q no quede null
      if (value != null){
        this.addTask(value);
        this.newTaskCtrol.setValue('');
      }
    }
  }

  addTask(newTitel: String) {
    const newTask = new Task ({
       titel: newTitel,
       date: new Date(),
       completed: false
     });
     this.taskServices.add(newTask)
     .subscribe (
       {
         next: (data) => this.EmitAddTask.emit(data),
         error: (e) => console.log(e)
       }
     )
   }

}
