import React from 'react'
import "./TodoForm.css"
export default function TodoForm() {
  return (
    <div className='todo-form'>
        <TodoComplete/>
    </div>
  )
}

export function TodoCreate () {
  return (<div className='todo-from-wrapper'>
        <h2 className='form-title'>Create </h2>
        <div className='input-fields form'>
             <div className='input-field'>
                <span className='task-name'>Task Name</span>
                <input className='form-input form'  name='name' placeholder='Type task Name'/>
             </div>
             <div className='input-field form'>
             <span className='task-name'>Category</span>
             <input className='form-input form' name='Assignment' placeholder='Type category'/>
              
             </div>
             <div className='split-input-field form'>
                <div className='input-field form-split'>
                <span className='task-name'>Date</span>
                <input className='form-input split' type = "date" name='name' placeholder='Type task Name'/>
                </div>
                <div className='input-field form-split'>
                <span className='task-name'>Time</span>
                <input className='form-input split' type = "time" name='name' placeholder='Type task Name'/>
                </div>
              </div>
              <div className='input-field form'>
             <span className='task-name'>Description</span>
             <textarea className='form-input description' name='Assignment' placeholder='Type category'></textarea>
              
             </div>
        </div>
  </div>
  )
}


export function TodoUpdate () {
    return (<div className='todo-form-wrapper'>
    <h2 className='form-title'>Update </h2>
    <div className='input-fields form'>
         <div className='input-field'>
            <span className='task-name'>Edit Name</span>
            <input className='form-input form'  name='name' placeholder='Type task Name'/>
         </div>
         <div className='input-field form'>
         <span className='task-name'>Edit Category</span>
         <input className='form-input form' name='Assignment' placeholder='Type category'/>
          
         </div>
         <div className='split-input-field form'>
            <div className='input-field form-split'>
            <span className='task-name'>Edit Date</span>
            <input className='form-input split' type = "date" name='name' placeholder='Type task Name'/>
            </div>
            <div className='input-field form-split'>
            <span className='task-name'>Edit Time</span>
            <input className='form-input split' type = "time" name='name' placeholder='Type task Name'/>
            </div>
          </div>
          <div className='input-field form'>
         <span className='task-name'>Edit Description</span>
         <textarea className='form-input description' name='Assignment' placeholder='Type category'></textarea>
          
         </div>
    </div>
</div>
    )
}

export function TodoComplete () {
    return (<div className='todo-form-wrapper'>
    <h2 className='form-title'>Complete </h2>
    <div className='input-fields form'>
         <div className='input-field'>
            <span className='task-name'>Name</span>
            <input className='form-input form'  name='name' placeholder='Type task Name'/>
         </div>
         <div className='input-field form'>
         <span className='task-name'>Score</span>
         <input className='form-input form' name='Assignment' placeholder='Type category'/>
          
         </div>
         <div className='split-input-field form'>
            <div className='input-field form-split'>
            <span className='task-name'>People worked with</span>
            <input className='form-input split' name='name' placeholder='Type task Name'/>
            </div>
            <div className='input-field form-split'>
            <span className='task-name'>Time</span>
            <input className='form-input split' name='name' placeholder='Type task Name'/>
            </div>
          </div>
          <div className='input-field form'>
         <span className='task-name'>Comments</span>
         <textarea className='form-input description' name='Assignment' placeholder='Type category'></textarea>
          
         </div>
         <div className='input-field form'>
         <span className='task-name'>Completed on time</span>
         <input className='form-input form' type = "checkbox" name='Assignment' placeholder='Type category'/>
         </div>
    </div>
</div>
    )
}
