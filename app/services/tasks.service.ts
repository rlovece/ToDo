import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  url: string = "http://localhost:3000";

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.url}/tasks`);
  }

  add(newTask: Task): Observable<Task>{
    return this.http.post<Task>(`${this.url}/tasks`, newTask);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.url}/tasks/${id}`);
  }

  update(id: number, updateTask: Partial<Task>): Observable<Task>{
    return this.http.put<Task>(`${this.url}/tasks/${id}`, updateTask);
  }
}
