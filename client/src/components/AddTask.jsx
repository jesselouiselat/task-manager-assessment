import { useState } from "react";
import axiosInstance from "../api/AxiosInstance";

export default function AddTask({ onCancel, onTaskAdded }) {
  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosInstance.post("/api/task/create", formData);
      window.alert(res.data.message);
      if (res.data.data) {
        onTaskAdded(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="card-body gap-3" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label font-semibold text-xs">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
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
            value={formData.content}
            onChange={handleChange}
            className="textarea text-area-bordered text-area-sm w-full text-black"
            required
          />
        </div>

        <div className="flex gap-2 justify-end mt-2">
          <button
            type="button"
            className="btn btn-sm btn-ghost"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-sm btn-primary">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
