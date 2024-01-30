import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/Models/Task.model';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent  implements OnInit{

  constructor(private taskService:TaskService,private route:ActivatedRoute,private router:Router){}
  taskTitle:string='';
  listId:string='';
  ngOnInit(){
    this.route.params.subscribe((params:Params)=>{
      this.listId=params['listId'];
      if(this.listId===''){
        this.router.navigate([`lists`])
      }
    })

  }
 

  createTask(pTitle:string){
    if(pTitle!==''){
      this.taskService.createTask(pTitle,this.listId).subscribe((newtask:Task)=>{
        this.router.navigate([`lists/${this.listId}`])
      })
    }
  }

}
