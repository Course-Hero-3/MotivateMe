import React, { useEffect } from 'react'
import "./TodoList.css"
import dueDateIcon from "../../assets/due-icon3.png"
import updateIcon from "../../assets/update-icon.png"
import completeIcon from "../../assets/complete-icon.png"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TodoForm from '../TodoForm/TodoForm'
import { useState } from 'react'
import lateIcon from "../../assets/late-icon.png"
import moment from "moment"

import apiClient from '../../../services/apiclient'
export default function TodoList({ showModal, modalSelected}) {
 /**useEffect 
  * handle
  */
  const [tasks, setTasks] = useState(null)
  const [taskError, setTaskError] = useState(null)
  const [refreshTasks, setRefreshTasks] = useState(false)

  useEffect(() => {

    const getTasks = async () => {
     let currentTasks = await apiClient.getAllTasks()
     if (currentTasks?.data){
      setTasks(currentTasks.data.allTasks)
     }
    }
    getTasks()
    if(tasks) {
    }
  }, [refreshTasks, modalSelected])

  const handleOnUpdateFormChange = (event, updateForm, setUpdateForm) => {
    // first check if it got set to 0
    if (event.target.name === "name" && event.target.value.length === 0) {
      setTaskError("Name field cannot be left empty")
    }
    if (event.target.name === "category" && event.target.value.length === 0) {
      setTaskError("Category field cannot be left empty")
    }
    if (event.target.name === "dueDate" && event.target.value.length === 0) {
      setTaskError("Due Date field cannot be left empty")
    }
    if (event.target.name === "dueTime" && event.target.value.length === 0) {
      setTaskError("Due Time field cannot be left empty")
    }

    // check if prior submits had anything set equal to zero
    if (taskError === "Name field cannot be left empty" && 
        event.target.name === "name" && event.target.value.length > 0) {
          setTaskError(null)
    }
    if (taskError === "Category field cannot be left empty" && 
        event.target.name === "category" && event.target.value.length > 0) {
          setTaskError(null)
    }
    if (taskError === "Due Date field cannot be left empty" && 
        event.target.name === "dueDate" && event.target.value.length > 0) {
          setTaskError(null)
    }
    if (taskError === "Due Time field is cannot be left empty" && 
        event.target.name === "dueTime" && event.target.value.length > 0) {
          setTaskError(null)
    }
    // update the form after all the checks regardless
    setUpdateForm({ ...updateForm, [event.target.name]: event.target.value })
  }

  const handleOnUpdateSubmit = async (event, updateForm, setUpdateOrComplete) => {
    event.preventDefault()

    // check if all required fields are filled
    if (updateForm.category.length !== 0 &&
      updateForm.dueDate.length !== 0 &&
      updateForm.name.length !== 0 &&
      updateForm.dueTime.length !== 0) {
        setTaskError(null)
    }
    else { // if not then check which one and return
      if (updateForm.name.length === 0) {
        setTaskError("Name field cannot be left empty")
        return
      }
      if (updateForm.category.length === 0) {
        setTaskError("Category field cannot be left empty")
        return
      }
      if (updateForm.dueDate.length === 0) {
        setTaskError("Due Date field cannot be left empty")
        return
      }
      if (updateForm.dueTime.length === 0) {
        setTaskError("Due Time field cannot be left empty")
        return
      }
    }
    // if error message exists, return and don't submit
    if (taskError !== null) {
      return
    }

    let {data, error} = await apiClient.updateTask(updateForm)
    
    if (data?.task) {
      setTaskError(null)
      setRefreshTasks(!refreshTasks)
      setUpdateOrComplete(null)
    } else {setTaskError(error)}
  }

  const handleOnCompleteFormChange = (event, completeForm, setCompleteForm) => {
    if (event.target.name === "score" && event.target.value.length === 0) {
      setTaskError("Score field cannot be left empty")
    }
    if (event.target.name === "timeSpent" && event.target.value.length === 0) {
      setTaskError("Time Spent field cannot be left empty")
    }

    // check if prior submits had anything set equal to zero
    if (taskError === "Score field cannot be left empty" && 
        event.target.name === "score" && event.target.value.length > 0) {
          setTaskError(null)
    }
    if (taskError === "Time Spent field cannot be left empty" && 
        event.target.name === "timeSpent" && event.target.value.length > 0) {
          setTaskError(null)
    }

    if (event.target.name === "onTime") {
      let newObject = completeForm
      newObject.onTime = !(completeForm.onTime)
      setCompleteForm(newObject)
      return 
    }
    else if (event.target.name === "public") {
      let newObject = completeForm
      newObject.public = (!completeForm.public)
      setCompleteForm(newObject)
      return
    } 
    setCompleteForm({ ...completeForm, [event.target.name]: event.target.value })
  }

  
  const handleOnCompleteSubmit = async(event, completeForm) => {
    event.preventDefault()

    if ((completeForm.score !== null && completeForm.score.length !== 0) &&
      (completeForm.timeSpent !== null && completeForm.timeSpent.length !== 0)) {
        setTaskError(null)
    }
    else { // if not then check which one and return
      if (completeForm.score === null || completeForm.score.length === 0) {
        setTaskError("Score field cannot be left empty")
        return
      }
      if (completeForm.timeSpent === null || completeForm.timeSpent.length === 0) {
        setTaskError("Time Spent field cannot be left empty")
        return
      }
    }
    // if error message exists, return and don't submit
    if (taskError !== null) {
      return
    }



    let {data, error} = await apiClient.completeTask(completeForm)
    
    if (data?.completedTask) {
      setTaskError("")
      setRefreshTasks(!refreshTasks)
    } else {setTaskError(error)}
  }

  const handleOnDeleteTask = async (event, taskId) => {
    event.preventDefault()
    let {data, error} = await apiClient.deleteTask({taskId:taskId})
    
    if (data?.deletedTask) {
      setTaskError("")
      setRefreshTasks(!refreshTasks)
    } else {setTaskError(error)}
  }

  return (
    <div className='todo-list'>
      <h3 className='todo-list-title'>Task Overview</h3>
      <div className='todo-list-wrapper'>
      {tasks?.map((task) => {
        return (<TodoCard taskError = {taskError}
                          taskId = {task.taskId} 
                          name = {task.name} 
                          category = {task.category} 
                          dueDate= {task.dueDate} 
                          dueTime = {task.dueTime} 
                          description = {task.description} 
                          showModal = {showModal} 
                          modalSelected = {modalSelected}
                          key = {task.taskId} 
                          handleOnUpdateFormChange = {handleOnUpdateFormChange}
                          handleOnUpdateSubmit = {handleOnUpdateSubmit}
                          handleOnCompleteFormChange = {handleOnCompleteFormChange}
                          handleOnCompleteSubmit = {handleOnCompleteSubmit}
                          handleOnDeleteTask = {handleOnDeleteTask}
      />)
      })}
   
     

      </div>
    
    </div>
  )
}


export function TodoCard ({name, 
                          description,
                          category, 
                          dueDate, 
                          dueTime,
                          handleOnCompleteFormChange, 
                          handleOnCompleteSubmit, 
                          taskId, 
                          handleOnUpdateFormChange, 
                          handleOnUpdateSubmit, 
                          handleOnDeleteTask, 
                          taskError }) {
  const [updateForm, setUpdateForm] = useState({name:name, 
                                                description: description, 
                                                category:category, 
                                                dueDate:moment(dueDate).format('YYYY-MM-DD'), 
                                                dueTime:dueTime, 
                                                taskId:taskId})
  const originalForm = {name:name, description: description, category:category, dueDate:moment(dueDate).format('YYYY-MM-DD'), dueTime:dueTime, taskId:taskId}
  const [completeForm, setCompleteForm] = useState({score:null, 
                                                    timeSpent: null, 
                                                    peopleWith:0, 
                                                    comment:"", 
                                                    onTime:false, 
                                                    taskId:taskId, 
                                                    public:false})
  const [updateOrComplete, setUpdateOrComplete] = useState(null)
  const [colorState, setColorState] = useState("default")
  useEffect(() => {
    if (category.toLowerCase() === "homework") {
      setColorState("blue")
    }
    else if (category.toLowerCase() === "test"){
      setColorState("orange")
    }
    else if (category.toLowerCase() === "quiz"){
      setColorState("purple")
    }
    else if (category.toLowerCase() === "project"){
      setColorState("green")
    }
    else if (category.toLowerCase() === "essay"){
      setColorState("yellow")
    }   
  }, [updateForm, handleOnUpdateSubmit])

    return (
        <div className={"todo-card " + colorState}>
            <div className='name-wrapper'><span className = "name">{name}</span></div>
            <div className='todo-card-footer'>
              <div className='due-date-wrapper'>
                  <img src={dueDateIcon} className = "due-icon"/>
                  <span className='due-date'>{moment(dueDate).format('YYYY-MM-DD')}</span>
              </div>
              <div className='form-icons'>
                <img  className = "form-icon" src = {updateIcon} alt = "update-icon" onClick = {() => {setUpdateOrComplete("update")}}/>
                <img className = "form-icon"  src = {completeIcon} alt = "complete-icon" onClick = {() => {setUpdateOrComplete("complete")}}/>
                {updateOrComplete === "update"?<TodoForm formType={"update"} 
                                                          updateForm = {updateForm} 
                                                          setUpdateForm = {setUpdateForm}
                                                          handleOnUpdateFormChange = {handleOnUpdateFormChange} 
                                                          handleOnUpdateSubmit = {handleOnUpdateSubmit}
                                                          originalForm = {originalForm} 
                                                          setUpdateOrComplete = {setUpdateOrComplete}
                                                          handleOnDeleteTask = {handleOnDeleteTask}
                                                          taskError = {taskError}
                />:null}
                {updateOrComplete === "complete"?<TodoForm formType={"complete"} 
                                                          completeForm = {completeForm} 
                                                          setCompleteForm = {setCompleteForm}
                                                          handleOnCompleteFormChange = {handleOnCompleteFormChange} 
                                                          handleOnCompleteSubmit = {handleOnCompleteSubmit} 
                                                          taskId = {taskId}
                                                          setUpdateOrComplete = {setUpdateOrComplete}
                                                          taskError = {taskError}
                                                          name = {name}
                />:null}  
              </div>
            </div>

        </div>
      )
}

export function TaskDetail ({name, description, category, dueDate, dueTime, showModal}){
  return (
    <div className='task-detail-card task_modal'>
      <div className='task_modal_content'>
      <div className='task-header'>
            <h4 className = "task-detail-name">{name}</h4>
           <button className='task-detail-btn'>Back</button>
        </div>
        <div className='task-detail-body'>
            <span className='task-detail-category'>{category}</span>
            <div className='task-detail-description'>
              <span className='description-title'>
                Description
              </span>

              <textarea className='detail-description'>
              {description}
              </textarea>
            </div>
        </div>
        <div className='task-detail-footer'>
          <span className='task-detail-due'>Due: {dueDate}:{dueTime}</span>
        </div>
      </div>
     
    </div>
  )
}
