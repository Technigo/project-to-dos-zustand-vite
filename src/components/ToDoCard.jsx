import { useToDoStore } from "../stores/useToDoStore";
import { ToDoSubmit } from "./ToDoSubmit";
import { Checkbox } from "./CheckBox";
import "./ToDoCard.css";

export const ToDoCard = () => {
  const { todos, removeTodo, toggleTodo, showForm, toggleForm } = useToDoStore();

  return (
    <div>
      <button onClick={toggleForm}>
        {showForm ? "Cancel" : "Add Task"}
      </button>
      {showForm && <ToDoSubmit />}

      <div className="todo-card-container">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">

            <span
              style={{ textDecoration: todo.completed ? "line-through" : "none" }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <Checkbox todo={todo} />
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

