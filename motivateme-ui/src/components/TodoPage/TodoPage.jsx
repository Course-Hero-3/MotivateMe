import React from 'react'
import "./TodoPage.css"
import TodoForm from "../TodoForm/TodoForm"
import TodoList from '../TodoList/TodoList'
import { useState } from 'react'

export default function TodoPage({todoItems}) {
  const [createBtnClicked, setCreateBtnClicked] = useState(false)

  /*if the create btn was clicked pop up the create form*/
  const handleOnCreateClick = (formType) => {
    setCreateBtnClicked(formType)
  }
  return (
    <div className='todo-page'>
      <h2 className='todo-title'>To-Do</h2>
      <div className='todo-btns'>
          <button className='todo-btn create' type='button' onClick={() => {handleOnCreateClick("create")}}>Create</button>
      </div>
      {createBtnClicked === "create"?<TodoForm formType={"create"} handleOnCreateClick = {handleOnCreateClick}/>:null}
      <div className='todo-wrapper'>
        <TodoList handleOnCreateClick = {handleOnCreateClick} createBtnClicked = {createBtnClicked}/>
      </div>
    </div>
  )
}
