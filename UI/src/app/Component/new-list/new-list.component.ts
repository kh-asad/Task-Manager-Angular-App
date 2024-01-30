import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/app/Models/List.model';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent {

  constructor(private taskService:TaskService,private router:Router){}
  
  listTitle:string='';

  createList(pTitle:string){
    if(pTitle!==''){
      this.taskService.createList(pTitle).subscribe((list:List)=>{
        this.router.navigate(['/lists',list._id]);
      })
    }
  }

}
