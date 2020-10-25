import { Component, OnInit } from '@angular/core';
import {ListService} from '../../services/list.service';
import {NgForm} from '@angular/forms';
import {List} from '../../models/list';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {

  constructor(private listService: ListService) { }

  ngOnInit(): void {

  }

  onSubmit(listForm: NgForm) {
    console.log(listForm.value);
    const list = new List();
    list.setTitle(listForm.control.get('listTitle').value);
    this.saveList(list);
  }

  saveList(list: List) {
    this.listService.createList(list).subscribe((list: List) => {
      console.log(list);
    });
  }

}
