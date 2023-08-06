"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Tasks from "@/components/Tasks";
import AddTask from "@/components/AddTask";
import { Circles } from "react-loader-spinner";

export default function Home() {
  const [isLoading, setIsLodding] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Open Modal
  const openModal = () => {
    setIsOpen(true);
  };

  // colseModal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Loads Tasks on page loads
  useEffect(() => {
    setIsLodding(true);
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
      setIsLodding(false);
    };
    getTasks();
  }, []);

  //Fetch Tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      const data = await response.data;
      return data;
    } catch (error) {
      alert(error);
    }
  };

  // Add Task

  const addTask = async (task) => {
    const { text, day, reminder } = task;
    const response = await axios.post("/api/tasks", { text, day, reminder });
    const data = await response.data;
    setTasks([...tasks, data]);
  };

  //Fetch a Task
  const fetchTask = async (id) => {
    try {
      const response = await axios.get(`/api/tasks/${id}`);
      return response.data;
    } catch (error) {
      alert(error);
    }
  };
  // DELETE TASK
  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
    closeModal();
  };

  //Toggle Reminder

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
    try {
      await axios.put(`/api/tasks/${id}`, {
        reminder: updatedTask.reminder,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass="circles"
          visible={true}
        />
      ) : (
        <div className="container">
          <Header
            onAdd={() => setShowAddTask(!showAddTask)}
            showAdd={showAddTask}
          />
          {showAddTask && <AddTask onAdd={addTask} />}
          {tasks.length > 0 ? (
            <div className="scroll">
              <h6
                style={{
                  color: "red",
                  paddingLeft: "5px",
                  marginTop: "20px",
                }}
              >
                <i>Double click on a task to toggle its reminder</i>
              </h6>
              <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onIsOpen={isOpen}
                onToggle={toggleReminder}
                onClose={closeModal}
                onOpen={openModal}
              />
            </div>
          ) : (
            <p>No Tasks to Show</p>
          )}
        </div>
      )}
      <Footer />
    </>
  );
}
