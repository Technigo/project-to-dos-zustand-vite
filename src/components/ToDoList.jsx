import { GiBurningDot } from "react-icons/gi";

import { useTask } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";

import "../style/ToDoList.scss";

export const ToDoList = () => {
  const { toDoList, removeTask, updatedStatus } = useTask();
  const { darkMode } = useTheme();

  return (
    <div className="tasklist">
      <ul>
        {toDoList.map((taskObj) => (
          <li
            className={darkMode ? "background-dark" : "background-light"}
            key={taskObj.id}
          >
            <input
              type="checkbox"
              checked={taskObj.status}
              onChange={() => updatedStatus(taskObj.id)}
            />
            <GiBurningDot className="fireball" />{" "}
            <p className="single-task">{taskObj.text}</p>{" "}
            <GiBurningDot className="fireball" />{" "}
            <p className="date">{taskObj.date}</p>
            <button onClick={() => removeTask(taskObj.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
