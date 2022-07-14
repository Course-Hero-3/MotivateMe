import React from 'react'
import "./TodoList.css"
import dueDateIcon from "../../assets/due-icon3.png"
export default function TodoList({tasks}) {
  return (
    <div className='todo-list'>
        <TodoCard name = "Complete 3 Problems for DM HW#4" dueDate="July 22, 2022"/>
        <TodoCard name = "Complete 3 Problems for DM HW#4" dueDate="July 22, 2022"/>
 


    </div>
  )
}


export function TodoCard ({name, description, category, dueDate, dueTime}) {
    return (
        <div className='todo-card'>
            <div className='name-wrapper'><h2 className = "name">{name}</h2></div>
            <div className='due-date-wrapper'>
                <img src={dueDateIcon} className = "due-icon"/>
                <h2 className='due-date'>{dueDate}</h2>
            </div>
        </div>
      )
}
