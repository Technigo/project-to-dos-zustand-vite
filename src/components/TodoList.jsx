import { useTodoContext } from "../context/TodoContext";
import { RemoveButton } from "./RemoveButton";

import "./TodoList.css";

const TodoList = () => {
  const { todos, toggleComplete, removeTodo, formatCreatedAt } = useTodoContext();

  return (
    <div className="todo-list-container" aria-label="Task List">
      {todos.map((todo) => (
        <div className="todo-card" key={todo.id}>
          <div className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              aria-label={`Mark task ${todo.completed ? "incomplete" : "complete"
                }`}
            />
            {/* this class is responsible for applying a strikethrough effect to the todo text*/}
            <span className={todo.completed ? "completed" : ""}>
              {todo.text}
            </span>
            <RemoveButton 
              onClick={() => removeTodo(todo.id)}
              aria-label="Remove task"
            />
          </div>
          <span className="timestamp">Created {formatCreatedAt(todo.createdAt)}</span>
          {/* <span className="timestamp">
            {moment(todo.createdAt).format("D/MM/YY")}
          </span> */}
        </div>
      ))}
    </div>
  );
};

export default TodoList;

/* this allows to display todos */

/* handle checkbox: added and <input> element of type 'checkbox'. set it 'checked' attribute based on the 'completed' property of each to do item. then added an 'onChange' event handler to call the ´toggleComplete´ function provided by the context when the checkbox is clicked. Next update the 'TodoContext'*/