import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FakeBackEndService} from './fake-back-end.service';
import {Card} from './models/card';
import {ListService} from './services/list.service';
import {List} from './models/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'taskManagerList';
  cards: Card[];
  lists: List[];
  @ViewChildren('tmpCards') elementCards: QueryList<ElementRef>;

  constructor(private fakeService: FakeBackEndService, private listService: ListService) {
  }

  ngOnInit() {
  }
}
