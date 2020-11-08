import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewListComponent} from './pages/new-list/new-list.component';
import {TaskViewComponent} from './pages/task-view/task-view.component';
import {NewTaskComponent} from './pages/new-task/new-task.component';

const routes: Routes = [
  {path: '', redirectTo: '/lists', pathMatch: 'full'},
  {path: 'lists', component: TaskViewComponent},
  {path: 'lists/:id', component: TaskViewComponent},
  {path: 'new-list', component: NewListComponent},
  {path: 'new-task', component: NewTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
