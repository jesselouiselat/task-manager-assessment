import { useState } from "react";
import axiosInstance from "../api/AxiosInstance";

export default function AddTask(params) {
  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleChange = async (event) => {};

  const handleSubmit = async (event) => {
    event.preventDefault;
    try {
      const res = await axiosInstance.post("/api/task", formData);
      console.log(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="card-body gap-3">
        <div className="form-control">
          <label className="label font-semibold text-xs">Title</label>
          <input
            type="text"
            name="title"
            className="input input-bordered input-sm w-full text-black"
            required
          />
        </div>
        <div className="form-control">
          <label className="label font-semibold text-xs">Content</label>
          <textarea
            type="text"
            name="content"
            className="textarea text-area-bordered text-area-sm w-full text-black"
            required
          />
        </div>

        <div className="flex gap-2 justify-end mt-2">
          <button className="btn btn-sm btn-ghost">Cancel</button>
          <button type="submit" className="btn btn-sm btn-primary">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
