import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Task} from '../../models/task';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ListService} from '../../services/list.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  listId: string;

  constructor(private route: ActivatedRoute, private apiService: ListService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = params.listId;
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    const task = new Task();
    task.title = form.control.get('task').value;
    task.listId = this.listId;
    this.saveTask(task);
  }

  saveTask(task: Task) {
    this.apiService.createTask(task).subscribe(() => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }

}
