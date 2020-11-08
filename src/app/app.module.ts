import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {HttpClientModule} from '@angular/common/http';
import { NewListComponent } from './pages/new-list/new-list.component';
import {AppRoutingModule} from './app-routing.module';
import {TaskViewComponent} from './pages/task-view/task-view.component';
import {FormsModule} from '@angular/forms';
import { NewTaskComponent } from './pages/new-task/new-task.component';

@NgModule({
  declarations: [
    AppComponent,
    NewListComponent,
    TaskViewComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
