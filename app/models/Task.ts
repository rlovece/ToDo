export interface ITask {
  id: number;
  date: Date;
  titel: string;
  description: string;
  completed: boolean;
  editing: boolean;
}

export class Task implements ITask{
  id: number = 0 ;
  date: Date = new Date();
  titel: string = '';
  description: string = '';
  completed: boolean = false;
  editing: boolean = false;

  constructor (task?: any){
    this.id = task == undefined ? 0 : task.id;
    this.date = task == undefined ? new Date() : task.date;
    this.titel = task == undefined ? '' : task.titel;
    this.description = task == undefined ? '' : task.description;
    this.completed = task == undefined ? false : task.completed;
    this.editing = task == undefined ? false : task.editing;
  }

}
