import React, { useContext, useState } from "react"
import MyContext from "/src/MyContext"
import "./todoForm.css"
import "./todoFormDark.css"
import { ThemeConsumer } from "/src/ThemeContext.jsx"

const TodoForm = () => {
  const { addTodo, todos } = useContext(MyContext)
  const [text, setText] = useState("")
  const [dueDate, setDueDate] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) {
      return
    }
    addTodo(text, dueDate)
    setText("")
    setDueDate("")
  }

  const totalTasks = todos.length
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <form onSubmit={handleSubmit} className={`TodoForm ${theme}`}>
          <h2>Todo List: {totalTasks}</h2>
          <input
            className="text-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a new task..."
          />
          <button className="add-task" type="submit">
            Add task
          </button>
          <input
            type="datetime-local"
            placeholder="Pick a date..."
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="dateInput"
          />
        </form>
      )}
    </ThemeConsumer>
  )
}

export default TodoForm
