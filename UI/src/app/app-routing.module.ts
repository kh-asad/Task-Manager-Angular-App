import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './Component/task-view/task-view.component';
import { NewListComponent } from './Component/new-list/new-list.component';
import { NewTaskComponent } from './Component/new-task/new-task.component';

const routes: Routes = [
  { path:'' , redirectTo:'lists' ,pathMatch:'full'},
  { path: 'new-list' , component:NewListComponent},
  { path:'lists/:listId',component:TaskViewComponent},
  { path:'lists',component:TaskViewComponent},
  { path: 'lists/:listId/new-task' , component:NewTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
