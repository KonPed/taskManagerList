import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FakeBackEndService} from './fake-back-end.service';
import {Card} from './models/card';
import {ListService} from './services/list.service';
import {List} from './models/list';
import {Subscription} from 'rxjs';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  listSubscription: Subscription;
  title = 'taskManagerList';
  cards: Card[];
  lists: List[];
  showFiller = false;

  constructor(private fakeService: FakeBackEndService, private listService: ListService,
              private router: Router) {
  }

  ngOnInit() {
    this.listSubscription = this.listService.getAllLists().subscribe((lists: List[]) => {
      console.log(lists);
      this.lists = lists;
    });
    this.router.events.subscribe((routerEvent: RouterEvent) => {
      if (routerEvent instanceof NavigationEnd && routerEvent.url === '/') {
        this.listSubscription = this.listService.getAllLists().subscribe((lists: List[]) => {
          console.log(lists);
          this.lists = lists;
        });
      }
    });
  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
  }
}
