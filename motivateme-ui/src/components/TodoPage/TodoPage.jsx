import React from 'react'
import "./TodoPage.css"
import TodoForm from "../TodoForm/TodoForm"
import TodoList from '../TodoList/TodoList'


export default function TodoPage({todoItems}) {
  return (
    <div className='todo-page'>
      <h2 className='todo-title'>To-Do</h2>
      <div className='todo-btns'>
          <button className='todo-btn create' type='button'>Create</button>
          <button className='todo-btn update' type='button'>Update</button>
          <button className='todo-btn complete' type='button' >Complete</button>
      </div>
      <div className='todo-wrapper'>
        <TodoList/>
        <TodoForm/>
      </div>
    </div>
  )
}
