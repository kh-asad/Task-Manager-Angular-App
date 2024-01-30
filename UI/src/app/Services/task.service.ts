import { Injectable } from '@angular/core';
import { WebRequestsService } from './web-requests.service';
import { Task } from '../Models/Task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webService:WebRequestsService) { }


  getLists(){
    return this.webService.get('lists');
  }

  createList(pTitle:string){
    return this.webService.post('lists',{title:pTitle});
  }

  getTasks(listId:string){
   return this.webService.get(`lists/${listId}/tasks`);
  }

  createTask(pTask:string,pListId:string){
    return this.webService.post(`lists/${pListId}/tasks`,{title:pTask});
  }

  completeTask(pTask:Task){
    return this.webService.patch(`lists/${pTask._listId}/tasks/${pTask._id}`,{completed:!pTask.completed});
  }

}
