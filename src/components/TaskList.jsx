import { useTaskStore } from "../stores/useTaskStore";
import { useThemeStore } from "../stores/useThemeStore";
import SleepingSloth from "../assets/sleeping-sloth.jpg";
import { Task } from "./Task";
import { FaCheckDouble } from "react-icons/fa";

export const TaskList = () => {
  // Access tasks
  const tasks = useTaskStore((state) => state.tasks);
  // Access toggleTask
  const toggleTask = useTaskStore((state) => state.toggleTask);
  // Access deleteTask
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const completeAllTasks = useTaskStore((state) => state.completeAllTasks);
  // Access theme
  const theme = useThemeStore((state) => state.theme);

  // Group tasks by category
  const tasksByCategory = tasks.reduce(
    (acc, task) => {
      // reduce() method takes an array and transforms it into an object
      // Check if the current task's category exists as a key in the accumulator (the object that stores categories as keys).
      // If not, create a new key with an empty array as its value.
      if (!acc[task.category]) {
        acc[task.category] = [];
      }

      // Push the current task into the array for its category
      acc[task.category].push(task);

      // Return the updated accumulator for the next iteration
      return acc;
    },
    // Initial value for the accumulator (an empty object to store categories)
    {}
  );

  // Define category colors
  const categoryColors = {
    Personal: "bg-personal text-personal-text",
    Work: "bg-work text-work-text",
    Home: "bg-home text-home-text",
    School: "bg-school text-school-text",
    Social: "bg-social text-social-text",
    Creative: "bg-creative text-creative-text",
    Other: "bg-other text-other-text",
  };

  // Check if all tasks are completed
  const allTasksCompleted =
    tasks.length > 0 && tasks.every((task) => task.completed);

  return (
    <section className="flex flex-col gap-5 h-full">
      {/* Button to mark all tasks complete (only show if there are tasks) */}
      {!allTasksCompleted && tasks.length > 0 && (
        <div className="flex justify-center items-center">
          <button
            onClick={completeAllTasks}
            className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-md shadow hover:bg-accent/90"
          >
            <FaCheckDouble />
            Mark All Tasks Complete
          </button>
        </div>
      )}
      {/* Display Sleeping Sloth when all tasks are complete */}
      {allTasksCompleted ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-64 h-64 rounded-lg overflow-hidden">
            <img
              src={SleepingSloth}
              alt="A drawing of a sleeping sloth"
              className="w-full h-full object-cover"
            />
          </div>
          <p
            className={` mt-4 text-lg 
            ${theme === "light" ? "text-primary" : "text-secondary"}`}
          >
            Nothing to do? Time to take a nap!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Loop through the categories */}
          {Object.keys(tasksByCategory).map((category) => (
            <div
              key={category}
              className={
                // "bg-secondary text-primary p-4 rounded-lg shadow-md w-full sm:flex-basis-[48%] md:flex-basis-[30%] flex-shrink"
                `p-4 rounded-lg shadow-md ${
                  categoryColors[category] || "bg-other text-other-text"
                }`
              }
            >
              {/* Category Header */}
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                {category}
              </h2>
              <ul className="flex flex-col gap-2">
                {/* Use Task component to render individual tasks */}
                {tasksByCategory[category].map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    toggleTask={toggleTask}
                    deleteTask={deleteTask}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
