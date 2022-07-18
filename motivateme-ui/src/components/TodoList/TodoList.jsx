import React from 'react'
import "./TodoList.css"
import dueDateIcon from "../../assets/due-icon3.png"
import updateIcon from "../../assets/update-icon.png"
import completeIcon from "../../assets/complete-icon.png"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TodoForm from '../TodoForm/TodoForm'
import { useState } from 'react'
import lateIcon from "../../assets/late-icon.png"
export default function TodoList({tasks, showModal, modalSelected}) {
 /**useEffect 
  * handle
  */
  const [completeForm, setCompleteForm] = useState({score:null, timeSpent: null, peopleWith:null, comment:"", onTime:false, taskId:0, public:false})
  const handleOnCompleteFormChange = (event) => {
    if (event.target.name === "onTime") {
      let newObject = completeForm
      newObject.onTime = !(completeForm.onTime)
      setCompleteForm(newObject)
      console.log("onTime ", completeForm.onTime )
      return 
    }
    setCompleteForm({ ...completeForm, [event.target.name]: event.target.value })
  }

  
  const handleOnCompleteSubmit = () => {

    setCompleteForm({score:-1, timeSpent: -1, peopleWith:-1, comment:"", onTime:false, taskId:-4, public:false})
  }

  return (
    <div className='todo-list'>
      <h3 className='todo-list-title'>Task Overview</h3>
      <div className='todo-list-wrapper'>
      <TodoCard taskId = {1} name = "Complete 3 Problems for DM HW#4" 
      category = "Homework" dueDate="2022-07-21" showModal = 
      {showModal} modalSelected = {modalSelected}
      completeForm = {completeForm}
      setCompleteForm = {setCompleteForm}
        handleOnCompleteFormChange = {handleOnCompleteFormChange}
        handleOnCompleteSubmit = {handleOnCompleteSubmit}
      />
   

      </div>
    
    </div>
  )
}


export function TodoCard ({name, description, category, dueDate, dueTime, showModal, modalSelected, completeForm, setCompleteForm, handleOnCompleteFormChange, handleOnCompleteSubmit, taskId}) {
  const [updateForm, setUpdateForm] = useState({name:name, description: description, category:category, dueDate:dueDate, dueTime:dueTime, taskId:-4})
  const originalForm = {name:name, description: description, category:category, dueDate:dueDate, dueTime:dueTime, taskId:-4}
  console.log("name and category in card", updateForm.name, updateForm.category )

  const handleOnUpdateFormChange = (event) => {
    setUpdateForm({ ...updateForm, [event.target.name]: event.target.value })
  }

  const handleOnUpdateSubmit = () => {
    setUpdateForm({name:name, description: description, category:category, dueDate:dueDate, dueTime:dueTime, taskId:-4})
  }

    return (
        <div className='todo-card'>
            <div className='name-wrapper'><span className = "name">{name}</span></div>
            <div className='todo-card-footer'>
              <div className='due-date-wrapper'>
                  <img src={dueDateIcon} className = "due-icon"/>
                  <span className='due-date'>{dueDate}</span>
              </div>
              <div className='form-icons'>
                <img  className = "form-icon" src = {updateIcon} alt = "update-icon" onClick = {() => {showModal("update")}}/>
                <img className = "form-icon"  src = {completeIcon} alt = "complete-icon" onClick = {() => {showModal("complete")}}/>
                {modalSelected === "update"?<TodoForm formType={"update"} showModal = {showModal} updateForm = {updateForm} setUpdateForm = {setUpdateForm}
                  handleOnUpdateFormChange = {handleOnUpdateFormChange} handleOnUpdateSubmit = {handleOnUpdateSubmit}
                  originalForm = {originalForm}
                />:null}
                {modalSelected === "complete"?<TodoForm formType={"complete"} showModal = {showModal} completeForm = {completeForm} setCompleteForm = {setCompleteForm}
                  handleOnCompleteFormChange = {handleOnCompleteFormChange} handleOnCompleteSubmit = {handleOnCompleteSubmit} taskId = {taskId}
                />:null}  
              </div>
            </div>

        </div>
      )
}

export function TaskDetail ({name, description, category, dueDate, dueTime}){
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
