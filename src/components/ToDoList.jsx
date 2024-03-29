import { useState } from "react";
import "../components/ToDoList.css";

const ToDoList = () => {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");

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

  return (
    <main>
      <h1>To Do List</h1>
      <div className="input-container">
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
              <button className="done-btn" onClick={() => toggleDone(index)}>done</button>{" "}
              <button className="remove-btn" onClick={() => removeTask(index)}>remove</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ToDoList;
