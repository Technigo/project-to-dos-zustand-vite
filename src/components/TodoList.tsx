//List that shows all of the created tasks

import { useTodoStore } from "../store/useTodoStore";
import { TodoItem } from "./TodoItem";
import thumbIcon from "../assets/thumbIcon.png";
import waitIcon from "../assets/waitIcon.png";
import "../components/TodoList.css";

export const TodoList = () => {
  const todos = useTodoStore((state) => state.todos); //Access the list of to-do's from Zustand

  //Separate completed and incomplete to-do's
  const completedTodos = todos.filter((todo) => todo.completed);
  const incompleteTodos = todos.filter((todo) => !todo.completed);


  return (
    <div className="tasks-container">
      {/* Incomplete Tasks */}
      <div className="incomplete-tasks-container">
        <h2>
          Incomplete Tasks 
          <span>({incompleteTodos.length})</span>
          <img src={waitIcon} alt="Hourglass in light blue and orange" className="wait-icon" />
        </h2>
      {incompleteTodos.length === 0 ? (
          <p>You're a star!</p>
          ) : (
          incompleteTodos.map((todo) => <TodoItem key={todo.id} id={todo.id} />)
          )}
      </div>

        <div className="completed-tasks-container">
          {/* Completed Tasks */}
          <h2>
            Completed Tasks 
            <span>({completedTodos.length})</span>
            <img src={thumbIcon} alt="A hand doing thumbs-up with small yellow stars above" className="thumb-icon" /> 
          </h2>
          {completedTodos.length === 0 ? (
            // Why is the text below in the paragraph not showing on the site?
            <p>Hurray, you're doing great!</p>
          ) : (
            completedTodos.map((todo) => <TodoItem key={todo.id} id={todo.id} />)
          )}
        </div>
    </div>
  );
};
