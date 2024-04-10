//1. Input for writing
import { useState } from "react";
import "../style/NewTask.scss";
import { useTask } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";

export const NewTask = () => {
  const { addTask } = useTask();
  const { darkMode } = useTheme();
  const [taskInput, setTaskInput] = useState("");

  /* const handleAddTask = () => {
    if (taskInput != "") {
      const taskObj = { text: taskInput, completed: false };
      console.log(taskObj);
      addTask(taskObj);
      setTaskInput("");
    } else {
      alert("Please add a task");
    }
  }; */

  const handleAddTask = () => {
    if (taskInput != "") {
      addTask(taskInput);
      setTaskInput("");
    } else {
      alert("Please add a task");
    }
  };

  /* const getBackgroundClases = () => {
    if (darkMode === false) {
      return "task-input-box";
    } else {
      return "task-input-box task-input-box-dark";
    }
  }; */

  return (
    <>
      <div className="task-input-box">
        <label htmlFor="new-task">New Task:</label>
        <input
          type="text"
          id="new-task"
          placeholder="walking the dog"
          value={taskInput}
          onChange={(event) => setTaskInput(event.target.value)}
        />

        <button
          className={darkMode ? "dark-button" : "light-button"}
          onClick={handleAddTask}
        >
          Add to List
        </button>
      </div>
    </>
  );
};
