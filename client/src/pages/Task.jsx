import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import axiosInstance from "../api/AxiosInstance.js";
import AddTask from "../components/AddTask.jsx";

export default function Task() {
  const [tasks, setTasks] = useState([]);

  const [openNewTaskForm, setOpenNewTaskForm] = useState(false);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    status: "",
  });

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditForm({
      title: task.title,
      content: task.content,
      status: task.status,
    });
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async (event, taskId) => {
    event.preventDefault();
    try {
      const res = await axiosInstance.put(`/api/task/${taskId}`, editForm);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...editForm } : task,
        ),
      );
      setEditingTaskId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (task) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the task: ${task.title}`,
    );

    if (isConfirmed) {
      const res = await axiosInstance.delete(`/api/task/${task.id}`);
      window.alert(`Task ${task.title} is deleted`);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    }
  };

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const res = await axiosInstance.get("/api/task");
        setTasks(res.data.allTasks);
      } catch (error) {
        console.error(error);
      }
    };
    getAllTasks();
  }, []);
  return (
    <div>
      <Header />
      <div className="bg-base-200 py-8 sm:py-16 lg:py-24 mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-4 md:mb-16 lg:mb-24">
            <h2 className="text-base-content justify-center text-2xl font-semibold md:text-3xl lg:text-4xl">
              Tasks{" "}
              <span
                className="btn btn-primary text-xl mx-2"
                onClick={() => setOpenNewTaskForm(!openNewTaskForm)}
              >
                +
              </span>
            </h2>
          </div>
          {tasks.length === 0 ? (
            <span className="text-base-content text-xl font-semibold">
              No tasks
            </span>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {openNewTaskForm ? (
                <AddTask
                  onCancel={() => setOpenNewTaskForm(!openNewTaskForm)}
                  onTaskAdded={(newTask) => {
                    setTasks((prevTasks) => [newTask, ...prevTasks]);
                  }}
                />
              ) : (
                <></>
              )}
              {tasks.map((task) => {
                const isEditing = editingTaskId === task.id;
                return (
                  <div key={task.id} className="card shadow-none">
                    {isEditing ? (
                      <form
                        onSubmit={(e) => handleEditSubmit(e, task.id)}
                        className="card-body gap-3"
                      >
                        <div className="form-control">
                          <label className="label font-semibold text-xs">
                            Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={editForm.title}
                            onChange={handleChange}
                            className="input input-bordered input-sm w-full text-black"
                            required
                          />
                        </div>
                        <div className="form-control">
                          <label className="label font-semibold text-xs">
                            Content
                          </label>
                          <textarea
                            type="text"
                            name="content"
                            value={editForm.content}
                            onChange={handleChange}
                            className="textarea text-area-bordered text-area-sm w-full text-black"
                            required
                          />
                        </div>
                        <div className="form-control flex flex-row items-center gap-2 mt-1">
                          <input
                            type="checkbox"
                            name="status"
                            id={`status-${task.id}`}
                            checked={editForm.status}
                            onChange={handleChange}
                            className="checkbox checkbox-sm checkbox-primary"
                          />
                          <label
                            htmlFor={`status-${task.id}`}
                            className="label cursor-pointer font-semibold text-xs"
                          >
                            Finished
                          </label>
                        </div>
                        <div className="flex gap-2 justify-end mt-2">
                          <button
                            className="btn btn-sm btn-ghost"
                            onClick={cancelEditing}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn btn-sm btn-primary"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="card-body text-center">
                        <div className="flex justify-between">
                          <span className="text-base-content text-xl font-semibold">
                            {task.title}
                          </span>

                          <span className=" text-gray-400 text-s font-normal">
                            {task.status ? "✔️" : "not finished"}
                          </span>
                        </div>

                        <div className="divider my-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-base-content text-l font-semibold">
                            {task.content}
                          </span>
                          <div className="flex justify-end">
                            <button
                              className="btn btn-circle btn-text btn-secondary"
                              aria-label="Circle Soft Icon Button"
                              onClick={() => startEditing(task)}
                            >
                              ✏️
                            </button>

                            <button
                              className="btn btn-circle btn-text btn-secondary"
                              aria-label="Circle Soft Icon Button"
                              onClick={() => handleDelete(task)}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
