import React from 'react'
import { useState } from 'react'
import "./TodoForm.css"
export default function TodoForm({formType, modalSelected, showModal, updateForm, completeForm, setUpdateForm, taskId, setCompleteForm, handleOnCompleteFormChange, handleOnUpdateFormChange, handleOnCompleteSubmit, handleOnUpdateSubmit, originalForm
}) {
  const [createForm, setCreateForm] = useState({name:"", description: "", category:"", dueDate:"", dueTime:""})


  const handleOnCreateFormChange = (event) => {
    event.preventDefault()
    setCreateForm({ ...createForm, [event.target.name]: event.target.value })
  }

  const handleOnCreateSubmit = () => {
    /**api client call */
    

    setCreateForm({name:"", description: "", category:"", dueDate:"", dueTime:""})
  }
  return (
    <div className='todo-form'>

        {formType === "create"?<TodoCreate handleOnCreateSubmit = {handleOnCreateSubmit} handleOnCreateFormChange = {handleOnCreateFormChange} showModal = {showModal} createForm = {createForm} setCreateForm = {setCreateForm}/>:null}
        {formType === "update"?<TodoUpdate showModal = {showModal} updateForm = {updateForm} setUpdateForm = {
          setUpdateForm} handleOnUpdateFormChange = {handleOnUpdateFormChange} handleOnUpdateSubmit
          originalForm = {originalForm}
          />:null}
        {formType === "complete"?<TodoComplete showModal = {showModal} completeForm = {completeForm} setCompleteForm = {setCompleteForm} handleOnCompleteFormChange = {handleOnCompleteFormChange}
          handleOnCompleteSubmit = {handleOnCompleteSubmit} taskId = {taskId}
        />:null}

    </div>
  )
}

export function TodoCreate ({showModal, modalSelected, createForm, setCreateForm, handleOnCreateFormChange, handleOnCreateSubmit}) {
  return (<div className={`form_modal`}>

        <form className='form_modal_content'>
        <div className='form-header'>
        <h2 className='form-title'>Create </h2>
        <button className='back-btn' onClick={() => {
              showModal("")
              setCreateForm({name:"", description: "", category:"", dueDate:"", dueTime:""})
        }} type = "button">Back</button>
        </div>
        <div className='input-fields form'>
             <div className='input-field form'>
                <span className='task-name'>Task Name</span>
                <input className='form-input form' type="text" name='name' placeholder='type task name' value  = {createForm.name} onChange = {handleOnCreateFormChange}/>
             </div>
             <div className='input-field form'>
             <span className='task-name'>Category</span>
             <input className='form-input form' type ="text" name='category' placeholder='type category' value  = {createForm.category} onChange = {handleOnCreateFormChange}/>
              
             </div>
             <div className='split-input-field form'>
                <div className='input-field form-split'>
                <span className='task-name'>Date</span>
                <input className='form-input split' type = "date" name='dueDate' placeholder='type task name' value  = {createForm.dueDate} onChange = {handleOnCreateFormChange}/>
                </div>
                <div className='input-field form-split'>
                <span className='task-name'>Time</span>
                <input className='form-input split' type = "time" name='dueTime' placeholder='type task name' value  = {createForm.dueTime} onChange = {handleOnCreateFormChange}/>
                </div>
              </div>
              <div className='input-field form'>
             <span className='task-name'>Description</span>
             <textarea className='form-input description' type = "text" name='description' placeholder='description...' value  = {createForm.description} onChange = {handleOnCreateFormChange}></textarea>
             </div>
             {console.log("task name", createForm)}
             <button className = "form-submit-btn" type='button' onClick = {handleOnCreateSubmit}>Submit</button>
        </div>
        </form>

  </div>
  )
}


export function TodoUpdate ({showModal, updateForm, setUpdateForm, handleOnUpdateFormChange, handleOnUpdateSubmi,originalForm
}) {
    return (<div className={`form_modal`}>
    <form className='form_modal_content'>
    <h2 className='form-title'>update</h2>
        <button className='back-btn' onClick={() => {
              showModal("")
              setUpdateForm(originalForm)
        }} type = "button">Back</button>
    <div className='input-fields form'>
         <div className='input-field form'>
            <span className='task-name'>Edit Name</span>
            <input className='form-input form' name='name' placeholder='Type task Name' value = {updateForm.name} onChange = {handleOnUpdateFormChange}/>
         </div>
         <div className='input-field form'>
         <span className='task-name'>Edit Category</span>
         <input className='form-input form' name='category' placeholder='Type category' value = {updateForm.category} onChange = {handleOnUpdateFormChange}/>
          {console.log("category", updateForm.category)}
          {console.log("name", updateForm.name)}

         </div>
         <div className='split-input-field form'>
            <div className='input-field form-split'>
            <span className='task-name'>Edit Date</span>
            <input className='form-input split' type = "date" name='dueDate' placeholder='Type task Name' value = {updateForm.dueDate} onChange = {handleOnUpdateFormChange}/>
            </div>
            <div className='input-field form-split'>
            <span className='task-name'>Edit Time</span>
            <input className='form-input split' type = "time" name='dueTime' placeholder='Type task Name' value = {updateForm.dueTime} onChange = {handleOnUpdateFormChange}/>
            </div>
          </div>
          <div className='input-field form'>
         <span className='task-name'>Edit Description</span>
         <textarea className='form-input description' name='description' placeholder='Type category' value = {updateForm.description} onChange = {handleOnUpdateFormChange}></textarea>
          
         </div>
         <button className = "form-submit-btn" type='button' onClick = {() => {handleOnUpdateSubmit}}>Submit</button>

    </div>
    </form>
   
</div>
    )
}

export function TodoComplete ({showModal, setCompleteForm, completeForm, handleOnCompleteFormChange,handleOnCompleteSubmit, name, taskId}) {
    return (<div className={`form_modal`}>
    <div className='form_modal_content'>
    <div className='form-header'>
        <h2 className='form-title'>Complete</h2>
        <button className='back-btn' onClick={() => {
              showModal("")
              setCompleteForm({score:null, timeSpent: null, peopleWith:null, comment:"", onTime:false, taskId:0, public:false})
        }} type = "button">Back</button>
        </div>
    <div className='input-fields form'>
         <div className='input-field'>
            <span className='task-name'>{name}</span>
         </div>
         <div className='input-field form'>
         <span className='task-name'>Score</span>
         <input className='form-input form' name='score' placeholder='Type category' onChange = {handleOnCompleteFormChange}/>
          
         </div>
         <div className='split-input-field form'>
            <div className='input-field form-split'>
            <span className='task-name'>People worked with</span>
            <input className='form-input split' name='peopleWith' placeholder='Type task Name' onChange = {handleOnCompleteFormChange}/>
            </div>
            <div className='input-field form-split'>
            <span className='task-name'>Time</span>
            <input className='form-input split' name='timeSpent' placeholder='Type task Name' onChange = {handleOnCompleteFormChange}/>
            </div>
          </div>
          <div className='input-field form'>
         <span className='task-name'>Comments</span>
         <textarea className='form-input description' name='comment' placeholder='Type category' onChange = {handleOnCompleteFormChange}></textarea>
          
         </div>
         <div className='input-field checkbox'>
         <span className='task-name'>Completed on time</span>
         <input className='form-input form' type = "checkbox" name='onTime' onChange = {handleOnCompleteFormChange}/>
         </div>
         {console.log("task id is: ",taskId)}
         <button className = "form-submit-btn" type='button' onClick = {() => {handleOnCompleteSubmit(taskId)}}>Submit</button>

    </div>
    </div>

</div>
    )
}
