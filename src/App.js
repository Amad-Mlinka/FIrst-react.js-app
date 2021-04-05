import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from "./components/Header";
import "./style/index.css";
import { Tasks } from "./components/Tasks";
import { AddTask } from "./components/AddTask";
import { Footer } from './components/Footer';
import { About } from './components/About';



function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  //Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  //Fetch tasks
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  //Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(
      tasks.filter((task) => {
        return task.id !== id;
      })
    );
  };

  //Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateTask),
    });

    const data = await res.json;

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: updateTask.reminder } : task
      )
    );
  };
  //Add task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);

    /*const id=Math.floor(Math.random()*10000)+tasks.length
  const newTask={id,...task}
  setTasks([...tasks,newTask])*/
  };

  return (
  <Router>
    <div className="container">
      <Header
        showAddTask={showAddTask}
        onAdd={() => setShowAddTask(!showAddTask)}
      />
     
      <Route path="/" exact render={(props)=>(
        <>
         {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No tasks to show"
      )}
        </>
      ) }/>
      <Route path="/about" component={About}/>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
