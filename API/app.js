const express = require("express");
const app = express();
const cors=require('cors')
const bodyParser = require("body-parser");
const { mongoose } = require("./DB/mongoose");


//Load Mongoose Model
const { List, Task } = require("./DB/models");

//Load Middleware
app.use(bodyParser.json());

app.options('*', cors())
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Route Handlers
// List Routes

// GET /lists
// Purpose: Get all lists

app.get("/lists", (req, res) => {
  //Return array of lists from the db
  List.find()
    .then((lists) => {
      res.send(lists);
    })
    .catch((e) => {
      res.send(e);
    });
});

// POST /lists
// Purpose: Create new list
app.post("/lists", (req, res) => {
  //Create new list and return new list document to the user(which includes id)
  // List field info will be passed by via JSON req body
  let title = req.body.title;
  let newList = new List({
    title,
  });
  newList.save().then((listDoc) => {
    //Full List Doc is returned
    res.send(listDoc);
  });
});

//Patch /lists
//Purpose: Update a list
app.patch("/lists/:id", (req, res) => {
  //Update the specified list (list document with id) with new values in JSON body of req
  List.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

app.delete("/lists/:id", (req, res) => {
  //Delete the specified list(via id)
  List.findOneAndDelete({ _id: req.params.id }).then((removedListDoc) => {
    res.send(removedListDoc);
  });
});

app.get("/lists/:listId/tasks", (req, res) => {
  // Get tasks from a specific list
  Task.find({ _listId: req.params.listId }).then((tasks) => {
    res.send(tasks);
  });
});

app.get("/lists/:listId/tasks/:taskId", (req, res) => {
    // Get tasks from a specific list
    Task.findOne({ _listId: req.params.listId,_id:req.params.taskId }).then((tasks) => {
      res.send(tasks);
    });
  });


app.post("/lists/:listId/tasks",(req,res)=>{
    // Create a new task
    let newTask=new Task({
        title:req.body.title,
        _listId:req.params.listId
    });
    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc);
    })
})

app.patch("/lists/:listId/tasks/:taskId",(req,res)=>{
    Task.findOneAndUpdate({
        _id:req.params.taskId,
        _listId:req.params.listId
    },{ 
        $set:req.body
    }).then(()=>{
        res.send({message:'Updated Successfully'});
    });
});

app.delete("/lists/:listId/tasks/:taskId",(req,res)=>{
    Task.findOneAndDelete({
        _id:req.params.taskId,
        _listId:req.params.listId
     }).then((removeTaskDoc)=>{
        res.send(removeTaskDoc);
     })
});

app.listen(3000, () => {
  console.log("Server is listening on Port 3000");
});
