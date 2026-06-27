import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import axiosInstance from "../api/AxiosInstance.js";
import AddTask from "../components/AddTask.jsx";
import EditTask from "../components/EditTask.jsx";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [openNewTaskForm, setOpenNewTaskForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  // 🟢 MARKED CHANGE: New interactive filter and query states
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

  // 🟢 MARKED CHANGE: Pure client-side filter implementation on every render pass
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.status) ||
      (statusFilter === "pending" && !task.status);

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <Header />
      <div className="bg-base-200 py-8 sm:py-16 lg:py-24 mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 🟢 MARKED CHANGE: Refactored header layout to make room for filters */}
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

            {/* 🟢 MARKED CHANGE: Added operational input selectors mapped to state updates */}
            <div className="flex flex-col sm:flex-row gap-2">
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
                className="select select-bordered select-sm text-black"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed ✔️</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* 🟢 MARKED CHANGE: Swapped out tasks condition for filteredTasks criteria */}
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

              {/* 🟢 MARKED CHANGE: Loops cleanly through filtered results */}
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
                              t.id === taskId ? { ...t, ...updatedFields } : t,
                            ),
                          );
                          setEditingTaskId(null);
                        }}
                      />
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
                              onClick={() => setEditingTaskId(task.id)}
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
