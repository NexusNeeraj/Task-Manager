import { useState } from "react";

const TaskForm = ({ onSubmit, users }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
    dueDate: "",
    assignedTo: "",
    documents: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length <= 3) {
      setTask({ ...task, documents: files });
    } else {
      alert("You can upload up to 3 files only.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
      <input name="title" placeholder="Title" onChange={handleChange} className="input" required />
      <textarea name="description" placeholder="Description" onChange={handleChange} className="input" />
      <select name="priority" onChange={handleChange} className="input">
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <select name="status" onChange={handleChange} className="input">
        <option>Todo</option><option>In Progress</option><option>Done</option>
      </select>
      <input type="date" name="dueDate" onChange={handleChange} className="input" />
      <select name="assignedTo" onChange={handleChange} className="input">
        <option value="">Select user</option>
        {users.map((u) => <option key={u._id} value={u._id}>{u.email}</option>)}
      </select>
      <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Task</button>
    </form>
  );
};

export default TaskForm;
