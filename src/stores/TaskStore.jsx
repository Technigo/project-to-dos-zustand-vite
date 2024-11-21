import { create } from "zustand";
import { localStorageMiddleware } from "../utils/localStorageMiddleware";

const getInitialState = () => {
  const savedState = localStorage.getItem("tasks");
  return savedState
    ? JSON.parse(savedState)
    : {
        tasks: [],
        newTask: "",
        activeFilter: "all",
        dueDate: "",
        timestamp: "",
      };
};

export const useTaskStore = create(
  localStorageMiddleware("tasks")((set) => ({
    ...getInitialState(),

    // setNewTask: (value) => set({ newTask: value }),
    // setTimestamp: (timestamp) => set({ timestamp: timestamp }),
    setFilter: (filter) => set({ activeFilter: filter }),
    // setDueDate: (date) => set({ dueDate: date }),
    addTask: (taskName, category, dueDate, projectId, timestamp) =>
      set((state) => ({
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            name: taskName,
            completed: false,
            completedAt: null,
            timestamp: timestamp,
            category: category,
            dueDate: dueDate,
            projectId: projectId,
          },
        ],
      })),
    toggleTask: (taskId) =>
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                completed: !task.completed,
                completedAt: !task.completed ? new Date().toISOString() : null,
              }
            : task
        ),
      })),
    deleteTask: (taskId) =>
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      })),
  }))
);