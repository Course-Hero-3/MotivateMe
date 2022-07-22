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
String.prototype.replaceAt = function(index, replacement) {
  if (index >= this.length) {
      return this.valueOf();
  }

  return this.substring(0, index) + replacement + this.substring(index + 1);
}


export default function TodoList({ showModal, modalSelected}) {
 /**useEffect 
  * handle
  */
  const [tasks, setTasks] = useState(null)
  //const [searchTasks, setSearchTasks] = useState(null)
  const [searchBarQuery, setQuery] = useState("")
  const [categoryQuery, setCategoryQuery] = useState("")
  const [sortByDate, setSortByDate] = useState("")
  const [taskError, setTaskError] = useState(null)
  const [refreshTasks, setRefreshTasks] = useState(false)

  const fixRegexSpecialCharacters = (str) => {

    for (let i = 0; i < str.length; i++) {
    if (str[i] === "+") {
      str = str.replaceAt(i, "\\+")
      i += 1
    }
    // [ , ] , { , } , | , \
    else if (str[i] === ".") {
      str = str.replaceAt(i, "\\.")
      i += 1
    }
    else if (str[i] === "*") {
      str = str.replaceAt(i, "\\*")
      i += 1
    }
    else if (str[i] === "?") {
      str = str.replaceAt(i, "\\?")
      i += 1
    }
    else if (str[i] === "^") {
      str = str.replaceAt(i, "\\^")
      i += 1
    }
    else if (str[i] === "$") {
      str = str.replaceAt(i, "\\$")
      i += 1
    }
    else if (str[i] === "(") {
      str = str.replaceAt(i, "\\(")
      i += 1
    }
    else if (str[i] === ")") {
      str = str.replaceAt(i, "\\)")
      i += 1
    }
    else if (str[i] === "[") {
      str = str.replaceAt(i, "\\[")
      i += 1
    }
    else if (str[i] === "]") {
      str = str.replaceAt(i, "\\]")
      i += 1
    }
    else if (str[i] === "{") {
      str = str.replaceAt(i, "\\{")
      i += 1
    }
    else if (str[i] === "}") {
      str = str.replaceAt(i, "\\}")
      i += 1
    }
    else if (str[i] === "|") {
      str = str.replaceAt(i, "\\|")
      i += 1
    }
    else if (str[i] === "\\") {
      str = str.replaceAt(i, "\\")
      i += 1
    }
    }
    return str
    }

  /**gets the tasks that match users search query */
  const searchTasks = tasks?.filter((task) => {
    let fixedSearchBarQuery =  fixRegexSpecialCharacters(searchBarQuery)
      if (task.name.toLowerCase().match(fixedSearchBarQuery.toLowerCase()) !== null && categoryQuery === "") {
        return true
      }
      else if (categoryQuery === "Date" && tasks.sort((a,b) => { b.dueDate - a.dueDate})){
        return true
      }
      else if (task.name.toLowerCase().match(fixedSearchBarQuery.toLowerCase()) !== null && categoryQuery === task.category) {
        return true
      }
      else {
        return false
      }
    
    
  })

  
  /**get the most recent updated tasks */
  useEffect(() => {

    const getTasks = async () => {
     let currentTasks = await apiClient.getAllTasks()
     if (currentTasks?.data){
        setTasks(currentTasks.data.allTasks)
     }
    }
    getTasks()
  }, [refreshTasks, modalSelected, searchBarQuery, categoryQuery, setCategoryQuery])

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
  /**handles updating the task forms */
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

  /** handles submitting a task*/
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

  /**sorts most recent tasks by category */
  const handleCategory = (categoryName) => {
    setCategoryQuery(categoryName)
  }

    let {data, error} = await apiClient.completeTask(completeForm)
    
    if (data?.completedTask) {
      setTaskError("")
      setRefreshTasks(!refreshTasks)
    } else {setTaskError(error)}
  }

  /*handles deleting a task*/ 
  const handleOnDeleteTask = async (event, taskId) => {
    event.preventDefault()
    let {data, error} = await apiClient.deleteTask({taskId:taskId})
    
    if (data?.deletedTask) {
      setTaskError("")
      setRefreshTasks(!refreshTasks)
    } else {setTaskError(error)}
  }

  /** changes the searchBarQuery state based on the users search input*/
 const handleOnQueryChange = (event) => {

  setQuery(event.target.value)
 }



  /**render a card with info for each task the user has */
  return (
    <div className='todo-list'>
      <div className='todo-list-header'>
      <h3 className='todo-list-title'>Task Overview</h3>
      <form className='task-form'>
          <input type = "search" value={searchBarQuery} onChange = {(event) => {handleOnQueryChange(event)}} id = "query" name = "q" className='task-form-search'
            placeholder = "Search..." role = "search" aria-label = "Search through site content"/>
            <button className='task-form-btn'> <svg viewBox="0 0 1024 1024"><path className="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg></button>
        </form>
        <form className='sort-tasks'>
          <label htmlFor = "categories">By Category </label>
            <select name = "categories" className = "categories" onChange={(event) => {setCategoryQuery(event.target.value)}}>
            <option value = "" className='category-option'>All</option>
            <option value = "homework" className='category-option'>Homework</option>
            <option value = "quiz" className='category-option' >Quiz</option>
            <option value = "test" className='category-option' >Test</option>
            <option value = "project" className='category-option' >Project</option>
          </select>
        </form>
      </div>
      <div className='todo-list-wrapper'>
     
      {searchTasks?.map((task) => {
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
                          handleQuery = {handleOnQueryChange}
                          query = {query}
                          setQuery = {setQuery}
                        
      />
      )

      })}
   
     

      </div>
    
    </div>
  )
}

/**display info about each task */
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
                          taskError,
                          handleQuery,
                          query,
                          setQuery
                       }) {
  /**states */
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
  const [showDetail, setShowDetail] = useState(null)


  
  //changes the card colors based on the category of the task given
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

 /**determines if the task is late */
  const taskIsLate = () => {
    let currentDate = new Date()
    let newDueDate = new Date (moment(dueDate).format(`YYYY-MM-DDT${dueTime}`))
    if (currentDate.getTime() > newDueDate.getTime()){
      return true
    }
    else {
      return false
    }
  }

    return (
        <div className={"todo-card " + colorState}>
            <div className='card-header'>
              <div className='name-wrapper'><span className = "name">{name}</span></div>
              {taskIsLate()?<img src={lateIcon} className = "late-icon"/>:null}
            </div>
            <div className='todo-card-footer'>
              <div className='due-date-wrapper'>
                  <img src={dueDateIcon} className = "due-icon"/>
                  <span className='due-date'>{moment(dueDate).format('MMMM Do YYYY')}</span>
              </div>
              <div className='form-icons'>
                <img  className = "form-icon" src = {updateIcon} alt = "update-icon" onClick = {() => {setUpdateOrComplete("update")}}/>
                <img className = "form-icon"  src = {completeIcon} alt = "complete-icon" onClick = {() => {setUpdateOrComplete("complete")}}/>
                <svg  alt = "form-icon" id = "form-icon-info" onClick= {() => {setShowDetail({name, description, category, dueDate, dueTime})}} xmlns="http://www.w3.org/2000/svg" className ="icon icon-tabler icon-tabler-info-circle" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="12" cy="12" r="9" />
  <line x1="12" y1="8" x2="12.01" y2="8" />
  <polyline points="11 12 12 12 12 16 13 16" />
</svg>
            </div>

  </div>
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
                {showDetail?<TaskDetail name = {showDetail.name}
                                        description = {showDetail.description} 
                                        category = {showDetail.category} 
                                        dueDate = {showDetail.dueDate} 
                                        dueTime = {showDetail.dueTime}
                                        setShowDetail = {setShowDetail}
                                        showDetail = {showDetail}
                                         />:null}  
            

        </div>
      )
}
/*when a user clicks on a task, displays detailed info about the task*/ 
export function TaskDetail ({name, description, category, dueDate, dueTime,showDetail, setShowDetail}){
  return (
    <React.Fragment>
      {showDetail !== null?
            <div className='task-detail-card task_modal'>
            <div className='task_modal_content'>
            <div className='task-header'>
                  <h2 className = "task-detail-name">{name}</h2>
                  
                  <svg onClick = {() => {
             setShowDetail(null)}} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="18" y1="6" x2="6" y2="18" />
  <line x1="6" y1="6" x2="18" y2="18" />
</svg>
              </div>
              <div className='task-detail-body'>
                  <span className='task-detail-category'>{category}</span>
                    <textarea readOnly className='detail-description'>
                    {description}
                   </textarea>
              </div>
              <div className='task-detail-footer'>
                <span className='task-detail-due'>Due: {moment(dueDate).format("MMMM Do YYYY")} at {dueTime}</span>
              </div>
            </div>
          
          </div>:null
          }
    </React.Fragment>
   

  )
}
