import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import axiosInstance from "../api/AxiosInstance.js";
import AddTask from "../components/AddTask.jsx";
import EditTask from "../components/EditTask.jsx";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [openNewTaskForm, setOpenNewTaskForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "inactive" && task.status) ||
      (statusFilter === "active" && !task.status);

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <Header />
      <div className="bg-base-200 py-8 sm:py-16 lg:py-24 mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-base-content text-2xl font-semibold md:text-3xl lg:text-4xl">
              Tasks{" "}
              <span
                className="btn btn-primary text-xl mx-2"
                onClick={() => setOpenNewTaskForm(!openNewTaskForm)}
              >
                +
              </span>
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered input-sm text-black w-full sm:w-64"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="select select-bordered select-sm text-black w-full sm:w-45"
              >
                <option value="all">All Tasks </option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            {filteredTasks.length === 0 && !openNewTaskForm ? (
              <span className="text-base-content text-xl font-semibold">
                No matching tasks found
              </span>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {openNewTaskForm ? (
                  <AddTask
                    onCancel={() => setOpenNewTaskForm(false)}
                    onTaskAdded={(newTask) => {
                      setTasks((prevTasks) => [newTask, ...prevTasks]);
                      setOpenNewTaskForm(false);
                    }}
                  />
                ) : (
                  <></>
                )}

                {filteredTasks.map((task) => {
                  const isEditing = editingTaskId === task.id;
                  return (
                    <div key={task.id} className="card shadow-none">
                      {isEditing ? (
                        <EditTask
                          task={task}
                          onCancel={() => setEditingTaskId(null)}
                          onTaskUpdated={(taskId, updatedFields) => {
                            setTasks((prevTasks) =>
                              prevTasks.map((t) =>
                                t.id === taskId
                                  ? { ...t, ...updatedFields }
                                  : t,
                              ),
                            );
                            setEditingTaskId(null);
                          }}
                        />
                      ) : (
                        <div className="card-body text-center justify-center">
                          <div className="flex justify-between">
                            <span className="text-base-content text-xl font-semibold">
                              {task.title}
                            </span>
                            <span
                              className={`${task.status ? "text-gray-300" : "text-blue-700 font-semibold"} text-xs font-normal`}
                            >
                              {task.status ? "Inactive" : "Active "}
                            </span>
                          </div>

                          <div className="divider my-2" />
                          <div className="flex items-center justify-between">
                            <span className="text-start text-l font-semibold">
                              {task.content}
                            </span>
                          </div>
                          <div className="flex justify-end">
                            <button
                              className="btn btn-circle btn-text btn-secondary text-green-300 text-xs"
                              aria-label="Circle Soft Icon Button"
                              onClick={() => setEditingTaskId(task.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-circle btn-text btn-secondary text-red-300  text-xs"
                              aria-label="Circle Soft Icon Button"
                              onClick={() => handleDelete(task)}
                            >
                              Delete
                            </button>
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
    </div>
  );
}
