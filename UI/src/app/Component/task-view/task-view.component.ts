import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/Models/List.model';
import { Task } from 'src/app/Models/Task.model';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  lists:List[]=[];
  tasks:Task[]=[];

  constructor(private taskService:TaskService,private route: ActivatedRoute,private router:Router){}
  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      if(params[`listId`]){
        this.taskService.getTasks(params['listId']).subscribe((tasks:any)=>{
          this.tasks=tasks;
        })
      }  
    })

    this.taskService.getLists().subscribe((lists:any)=>{
      this.lists=lists
    })
  }

  onTaskClick(pTask: Task) {
    this.taskService.completeTask(pTask).subscribe(()=>{
      pTask.completed=!pTask.completed;
    })
  }


}
