import {Component, OnInit} from '@angular/core';
import {FakeBackEndService} from './fake-back-end.service';
import {Card} from './card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'taskManagerList';
  cards: Card[];

  constructor(private fakeService: FakeBackEndService) {
  }

  ngOnInit() {
    this.cards = this.fakeService.getCards();
    console.log(this.cards);
  }
}
