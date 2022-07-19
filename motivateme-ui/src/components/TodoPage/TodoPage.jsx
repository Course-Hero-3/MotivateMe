import React from 'react'
import "./TodoPage.css"
import TodoForm from "../TodoForm/TodoForm"
import TodoList from '../TodoList/TodoList'
import { useState } from 'react'

export default function TodoPage({todoItems}) {
  const [modalSelected, setModalSelected] = useState(false)

  /*if the create btn was clicked pop up the create form*/
  const showModal = (formType) => {
    setModalSelected(formType)
  }

 
  return (
    <div className='todo-page'>
      <h2 className='todo-title'>To-Do</h2>
      <div className='todo-btns'>
          <button className='todo-btn create' type='button' onClick={() => {showModal("create")}}>Create</button>
      </div>
      {modalSelected === "create"?<TodoForm formType={"create"} showModal = {showModal}/>:null}
      <div className='todo-wrapper'>
        <TodoList showModal = {showModal} modalSelected= {modalSelected}/>
      </div>
    </div>
  )
}
