import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {NewListComponent} from './pages/new-list/new-list.component';
import {TaskViewComponent} from './pages/task-view/task-view.component';

const routes: Routes = [
  {path: 'new-list', component: NewListComponent},
  {path: '', component: TaskViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
