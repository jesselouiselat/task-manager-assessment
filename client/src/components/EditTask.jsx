import { useState } from "react";
import axiosInstance from "../api/AxiosInstance";

export default function EditTask({ task, onCancel, onTaskUpdated }) {
  const [editForm, setEditForm] = useState({
    title: task.title,
    content: task.content,
    status: task.status,
  });

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
      onTaskUpdated(task.id, editForm);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="card shadow-none">
        <form
          onSubmit={(e) => handleEditSubmit(e, task.id)}
          className="card-body gap-3"
        >
          <div className="form-control">
            <label className="label font-semibold text-xs">Title</label>
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
            <label className="label font-semibold text-xs">Content</label>
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
            <button className="btn btn-sm btn-ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
