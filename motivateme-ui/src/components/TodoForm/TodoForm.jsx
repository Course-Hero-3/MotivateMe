import React from 'react'
import { useState } from 'react'
import "./TodoForm.css"
import apiClient from '../../../services/apiclient'
export default function TodoForm({formType, setUpdateOrComplete, modalSelected, showModal, updateForm, completeForm, setUpdateForm, taskId, setCompleteForm, handleOnCompleteFormChange, handleOnUpdateFormChange, handleOnCompleteSubmit, handleOnUpdateSubmit, originalForm, handleOnDeleteTask
}) {
  const [createForm, setCreateForm] = useState({name:"", description: "", category:"", dueDate:"", dueTime:""})
  const [createError, setCreateError] = useState(null)

  const handleOnCreateFormChange = (event) => {
    setCreateForm({ ...createForm, [event.target.name]: event.target.value })
  }

  const handleOnCreateSubmit = async (event) => {
    /**api client call */
    event.preventDefault()

    let {data, error} = await apiClient.addTask(createForm)
    
    if (data?.task) {
      console.log("NEW TASK IS: ", data.task)
      setCreateError("")
      setCreateForm({name:"", description: "", category:"", dueDate:"", dueTime:""})
      showModal("")
    } else {setCreateError(error)}

  }
  return (
    <div className='todo-form'>

        {formType === "create"?<TodoCreate handleOnCreateSubmit = {handleOnCreateSubmit} 
                                          handleOnCreateFormChange = {handleOnCreateFormChange} 
                                          showModal = {showModal} 
                                          createForm = {createForm} 
          setCreateForm = {setCreateForm}/>:null}

        {formType === "update"?<TodoUpdate showModal = {showModal} 
                                            updateForm = {updateForm} 
                                            setUpdateForm = {setUpdateForm}
                                            handleOnUpdateFormChange = {handleOnUpdateFormChange} 
                                            handleOnUpdateSubmit = {handleOnUpdateSubmit}
                                            setUpdateOrComplete = {setUpdateOrComplete}
                                            originalForm = {originalForm}
                                            handleOnDeleteTask = {handleOnDeleteTask}
          />:null}
          
        {formType === "complete"?<TodoComplete showModal = {showModal} 
                                              completeForm = {completeForm} 
                                              setCompleteForm = {setCompleteForm} 
                                              handleOnCompleteFormChange = {handleOnCompleteFormChange}
                                              handleOnCompleteSubmit = {handleOnCompleteSubmit} 
                                              taskId = {taskId}
                                              setUpdateOrComplete = {setUpdateOrComplete}
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
             <button className = "form-submit-btn" type='button' onClick = {handleOnCreateSubmit}>Submit</button>
        </div>
        </form>

  </div>
  )
}


export function TodoUpdate ({showModal, updateForm, setUpdateForm, handleOnUpdateFormChange, handleOnUpdateSubmit,originalForm, setUpdateOrComplete, handleOnDeleteTask
}) {
    return (<div className={`form_modal`}>
    <form className='form_modal_content'>
    <div className='form-header'>
        <h2 className='form-title'>Update</h2>
        <button className='back-btn' onClick={() => {
             setUpdateOrComplete(null)
              setUpdateForm(originalForm)
        }} type = "button">Back</button>
        </div>
    <div className='input-fields form'>
         <div className='input-field form'>
            <span className='task-name'>Edit Name</span>
            <input className='form-input form' name='name' placeholder='Type task Name' value = {updateForm.name} onChange = {(event) => {handleOnUpdateFormChange(event, updateForm, setUpdateForm)}}/>
         </div>
         <div className='input-field form'>
         <span className='task-name'>Edit Category</span>
         <input className='form-input form' name='category' placeholder='Type category' value = {updateForm.category} onChange = {(event) => {handleOnUpdateFormChange(event, updateForm, setUpdateForm)}}/>

         </div>
         <div className='split-input-field form'>
            <div className='input-field form-split'>
            <span className='task-name'>Edit Date</span>
            <input className='form-input split' type = "date" name='dueDate' placeholder='Type task Name' value = {updateForm.dueDate} onChange = {(event) => {handleOnUpdateFormChange(event, updateForm, setUpdateForm)}}/>
            </div>
            <div className='input-field form-split'>
            <span className='task-name'>Edit Time</span>
            <input className='form-input split' type = "time" name='dueTime' placeholder='Type task Name' value = {updateForm.dueTime} onChange = {(event) => {handleOnUpdateFormChange(event, updateForm, setUpdateForm)}}/>
            </div>
          </div>
          <div className='input-field form'>
         <span className='task-name'>Edit Description</span>
         <textarea className='form-input description' name='description' placeholder='Type category' value = {updateForm.description} onChange = {(event) => {handleOnUpdateFormChange(event, updateForm, setUpdateForm)}}></textarea>
          
         </div>
         <div className='update-footer-buttons'>
            <button className = "form-submit-btn" type='button' onClick = {(event) => {handleOnUpdateSubmit(event, updateForm, setUpdateForm);
            setUpdateOrComplete(null)}}>Update</button>
                <button className = "form-delete-btn" type='button' onClick={(event) => {handleOnDeleteTask(event, updateForm.taskId)}}>Delete</button>
         </div>
    

    </div>
    </form>
   
</div>
    )
}

export function TodoComplete ({setUpdateOrComplete, setCompleteForm, completeForm, handleOnCompleteFormChange,handleOnCompleteSubmit, name, taskId}) {
    return (<div className={`form_modal`}>
    <div className='form_modal_content'>
    <div className='form-header'>
        <h2 className='form-title'>Complete</h2>
        <button className='back-btn' onClick={() => {
              setUpdateOrComplete("")
              setCompleteForm({score:null, timeSpent: null, peopleWith:0, comment:"", onTime:false, taskId:taskId, public:false})
        }} type = "button">Back</button>
        </div>
    <div className='input-fields form'>
         <div className='input-field'>
            <span className='task-name'>{name}</span>
         </div>
         <div className='input-field form'>
         <span className='task-name'>Score</span>
         <input className='form-input form' name='score' type = "number" placeholder='enter percent without % symbol' onChange = {(event) => {handleOnCompleteFormChange(event, completeForm, setCompleteForm)}}/>
          
         </div>
         <div className='split-input-field form'>
            <div className='input-field form-split'>
            <span className='task-name'>People worked with</span>
            <input className='form-input split' name='peopleWith' type = "number" placeholder='how many people did you work with' onChange = {(event) => {handleOnCompleteFormChange(event, completeForm, setCompleteForm)}}/>
            </div>
            <div className='input-field form-split'>
            <span className='task-name'>Time Spent</span>
            <input className='form-input split' type = "number" name='timeSpent' placeholder='in minutes' onChange = {(event) => {handleOnCompleteFormChange(event, completeForm, setCompleteForm)}}/>
            </div>
          </div>
          <div className='input-field form'>
         <span className='task-name'>Comments</span>
         <textarea className='form-input description' name='comment' type = "text"placeholder='any comments?' onChange = {(event) => {handleOnCompleteFormChange(event, completeForm, setCompleteForm)}}></textarea>
          
         </div>
         <div className='input-field checkbox'>
         <span className='task-name'>Completed on time</span>
         <input className='form-input form' type = "checkbox" name='onTime' onChange = {(event) => {handleOnCompleteFormChange(event, completeForm, setCompleteForm)}}/>
         </div>
         <div className='input-field checkbox'>
         <span className='task-name'>Public</span>
         <input className='form-input form' type = "checkbox" name='public' onChange = {(event) => {handleOnCompleteFormChange(event, completeForm, setCompleteForm)}}/>
         </div>
         <button className = "form-submit-btn" type='button' onClick = {(event) => {handleOnCompleteSubmit(event, completeForm)}}>Complete</button>

    </div>
    </div>

</div>
    )
}
