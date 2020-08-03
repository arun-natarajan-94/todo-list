const express = require("express");
const task = require("../model/todoTask");

module.exports = {
    //Create a new Task
    createTask:  (req, res) => {

        //Create a new task
        let { taskName, 
            Description, 
            meetingAt, 
            reminderBefore, 
            expiry, 
            completionStatus } = req.body;   
            const userId = req.user.userId;


        const newTask = new task({
            taskName:taskName,
            Description: Description,
            meetingAt:meetingAt,
            reminderBefore:reminderBefore,
            expiry:expiry,
            completionStatus:completionStatus,
            userId:userId
        })
        // Save task into database
        newTask.save()
        .then(data => {
            res.status(200).send({
                Success: 0,
                Message:"New task Created!",
                Meeting: data
            })
        }).catch(err => {
            res.status(500).send({
                Success:0,
                Message: "Some error is occured wihile adding new task" + err.message
            })
        })
    },
    //Get the task by ID
    viewTaskById:  (req, res) => {
        task.findById(req.params._id)
        .then(note => {
            if(!note){
                return res.send({
                    Sucess:0,
                    Message:"Task not assigned with this ID"
                })
            }
            res.send({
                Success:0,
                Message: "Task Details",
                details: note
            })
        }).catch(err => {
            return res.status(500).send({
                Success:0,
                Message:"Error retrieving with id" + err
            })
        })
    },
    //Update the details in existig task
    updateTaskById:  (req, res) => {
        task.findByIdAndUpdate(req.params._id, {
            meetingAt: req.body.meetingAt,
            expiry: req.body.expiry,
            editTimeStamp: Date.now()
        }, {new: true})
        .then(note => {
            if(!note){
                return res.status(404).send({
                    Success:0,
                    Message:"No task assigned with this ID"
                });
            }
            res.status(200).send({
                Success:1,
                Message:"Updated Succesfully!",
                result: note
            }).catch(err => {
                if(err){
                    return res.status(500).send({
                        Success:0,
                        Message:"Error updating task with this id" + err.message
                    })
                }
            })
        })
    },
    //Delete the task
    deleteTaskById: (req, res) => {
        task.findByIdAndRemove(req.params._id)
        .then(task => {
            if(!task) {
                return res.status(404).send({
                    Success:0,
                    Message:"No task assigned with this ID!"
                })
            }
            res.send({
                Success:1,
                Message:"Task Deleted!"
            })
        }).catch(err => {
            if(err) {
                return res.status(500).send({
                    Success:0,
                    Message: "Error occured while deleting task" + err.message
                })
            }
        })
    },
    //Get All Task
    viewAllTask: (req, res) => {
        task.find()
        .then(task => {
            res.send({
                Success:0,
                Message:"All tasks!",
                Alltask: task
            })
        }).catch(err => {
            res.status(500).send({
                Success:0,
                Messsage:"Some error occured while retrieving all task"
            })
        })
    }
}
