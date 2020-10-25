import { Injectable } from '@angular/core';
import {WebService} from './web.service';
import {List} from '../models/list';

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
}
