import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FakeBackEndService} from './fake-back-end.service';
import {Card} from './card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'taskManagerList';
  cards: Card[];
  @ViewChildren('tmpCards') elementCards: QueryList<ElementRef>;

  constructor(private fakeService: FakeBackEndService) {
  }

  ngOnInit() {
    this.cards = this.fakeService.getCards();
  }

  onClick(index: number) {
    if (this.elementCards.toArray()[index].nativeElement.classList.contains('complete')) {
      this.elementCards.toArray()[index].nativeElement.classList.remove('complete');
    } else {
      this.elementCards.toArray()[index].nativeElement.classList.add('complete');
    }
  }
}
