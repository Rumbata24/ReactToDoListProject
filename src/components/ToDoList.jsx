import { useEffect, useState } from "react";
import "../components/ToDoList.css";

const ToDoList = () => {
  // Load tasks form local storage on component mount
  const storedTasks = localStorage.getItem("tasks");
  const initialTaskList = storedTasks ? JSON.parse(storedTasks) : [];

  const [taskList, setTaskList] = useState(initialTaskList);
  const [newTask, setNewTask] = useState("");

  // Save tasks to local storage whenever taskList changes

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const addTask = () => {
    if (newTask.trim() === "") {
      // Prevent adding empty tasks
      return;
    }
    const addNewTask = { task: newTask, done: false };
    setTaskList((t) => [...t, addNewTask]);
    setNewTask("");
  };

  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const toggleDone = (index) => {
    setTaskList((t) =>
      t.map((task, i) => (i === index ? { ...task, done: !task.done } : task))
    );
  };
  const removeTask = (index) => {
    setTaskList((t) => t.filter((_, i) => i !== index));
  };

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updateTask = [...taskList];
      [updateTask[index], updateTask[index - 1]] = [
        updateTask[index - 1],
        updateTask[index],
      ];
      setTaskList(updateTask);
    }
  };

  const moveTaskDown = (index) => {
    if (index < taskList.length - 1) {
      const updateTask = [...taskList];
      [updateTask[index], updateTask[index + 1]] = [
        updateTask[index + 1],
        updateTask[index],
      ];
      setTaskList(updateTask);
    }
  };

  return (
    <main>
      <h1>To Do List</h1>
      <div className="input-container">
        <div className="input">
          <input
            type="text"
            value={newTask}
            onChange={handleTaskChange}
            placeholder="Enter a task..."
          />
          <button onClick={addTask} className="add-task-btn">
            Add
          </button>
        </div>

        <ul>
          {taskList.map((task, index) => (
            <li key={index} className={`task ${task.done ? "done" : ""}`}>
              {task.task}

              <div className="btns">
                <div className="group-btn">
                  <button
                    className="done-btn"
                    onClick={() => toggleDone(index)}
                  >
                    {task.done ? 'undone' : 'done'}
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() => removeTask(index)}
                  >
                    remove
                  </button>
                </div>

                <div className="group-btn">
                  <button className="up-btn" onClick={() => moveTaskUp(index)}>
                    Up
                  </button>

                  <button
                    className="down-btn"
                    onClick={() => moveTaskDown(index)}
                  >
                    Down
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default ToDoList;
