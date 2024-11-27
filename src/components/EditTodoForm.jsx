import React, { useState } from 'react'

const EditTodoForm = ({task, editToDo}) => {
    const [value, setValue] = useState(task.task)

    const handleSubmit = (e) => {
        e.preventDefault()
        editToDo(value, task.id)
        setValue("")
    }
  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
        <input type="text" className='todo-input' placeholder='Update Task' value={value} onChange={(e) => setValue(e.target.value)} />
        <button type='submit' className='todo-btn'>Update</button>
    </form>
  )
}

export default EditTodoForm