import { useTodo } from "../contexts/TodoContext.jsx";
import { SingleTodo } from "./SingleTodo.jsx";

import "./todo-list.css";
//import moment from "moment";

//Map and list all todos
export const TodoList = () => {
  const { todo, removeToDo, clearList, handleRemoveChecked } = useTodo();

  //const filterDoneToDos = () => {};

  return (
    <div className="tasklist">
      {" "}
      {todo.map((task) => (
        <SingleTodo checked={task.checkmark} key={task.id} task={task} />
      ))}
      <div className="delete-btn-div">
        <div>
          {todo.length > 0 && (
            <button
              className="delete-btn-all"
              type="button"
              onClick={() => clearList()}
            >
              Clear all
            </button>
          )}
        </div>
        {/* {todo.length > 0 && (
          <button
            className="delete-btn-checked"
            type="button"
            onClick={() => handleRemoveChecked()}>
            ✔️ Clear checked
          </button>
        )}  */}
      </div>
    </div>
  );
};
