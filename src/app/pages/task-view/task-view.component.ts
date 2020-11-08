import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {List} from '../../models/list';
import {FakeBackEndService} from '../../fake-back-end.service';
import {ListService} from '../../services/list.service';
import {Card} from '../../models/card';
import {ActivatedRoute, Params} from '@angular/router';
import {Task} from '../../models/task';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {
  title = 'taskManagerList';
  cards: Card[];
  lists: List[];
  tasks: Task[];
  @ViewChildren('tmpCards') elementCards: QueryList<ElementRef>;

  constructor(private fakeService: FakeBackEndService, private listService: ListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cards = this.fakeService.getCards();
    this.route.params.subscribe((params: Params) => {
      this.listService.getTasks(params.id).subscribe((tasks: any[]) => {
        this.tasks = tasks;
      });
    });
  }
  /* Apply crossing style when a task consider complete. */
  onClick(index: number) {
    if (this.elementCards.toArray()[index].nativeElement.classList.contains('complete')) {
      this.elementCards.toArray()[index].nativeElement.classList.remove('complete');
    } else {
      this.elementCards.toArray()[index].nativeElement.classList.add('complete');
    }
  }

}
