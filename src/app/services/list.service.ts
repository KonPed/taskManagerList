import { Injectable } from '@angular/core';
import {WebService} from './web.service';
import {List} from '../models/list';
import {Task} from '../models/task';
@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private webService: WebService) { }

  getAllLists() {
    /* send a Web request ti create a list. */
    return this.webService.get('/api/lists');
  }

  createList(list: List) {
    return this.webService.post('/api/lists', list);
  }

  getTasks(listId: string) {
    return this.webService.get(`/api/lists/${listId}/tasks`);
  }

  createTask(task: Task) {
    return this.webService.post(`/api/lists/${task.listId}/tasks`, task);
  }

  completedTask(task: Task) {
    return this.webService.patch(`/api/lists/${task.listId}/tasks/${task._id}`, task);
  }
}
