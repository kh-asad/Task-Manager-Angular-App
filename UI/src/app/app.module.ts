import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './Component/task-view/task-view.component';
import {HttpClientModule} from '@angular/common/http';
import { NewListComponent } from './Component/new-list/new-list.component'
import { FormsModule } from '@angular/forms';
import { NewTaskComponent } from './Component/new-task/new-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
