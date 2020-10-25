import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {List} from '../../models/list';
import {FakeBackEndService} from '../../fake-back-end.service';
import {ListService} from '../../services/list.service';
import {Card} from '../../models/card';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {
  title = 'taskManagerList';
  cards: Card[];
  lists: List[];
  @ViewChildren('tmpCards') elementCards: QueryList<ElementRef>;

  constructor(private fakeService: FakeBackEndService, private listService: ListService) { }

  ngOnInit(): void {
    this.cards = this.fakeService.getCards();
    this.listService.getAllLists().subscribe((lists: List[]) => {
      this.lists = lists;
    });
  }

  onClick(index: number) {
    if (this.elementCards.toArray()[index].nativeElement.classList.contains('complete')) {
      this.elementCards.toArray()[index].nativeElement.classList.remove('complete');
    } else {
      this.elementCards.toArray()[index].nativeElement.classList.add('complete');
    }
  }

}
