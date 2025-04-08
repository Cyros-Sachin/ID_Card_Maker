import React, { useState } from "react";

const classOptions = ["10-A", "10-B", "11-A", "11-B"];
const busRoutes = ["Route 1", "Route 2", "Route 3"];
const allergyOptions = ["Peanuts", "Dairy", "Gluten", "Pollen"];

export default function StudentForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    classDivision: "",
    allergies: [],
    photo: null,
    rackNumber: "",
    busRoute: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((f) => ({ ...f, photo: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleAllergyChange = (e) => {
    const { value, checked } = e.target;
    setForm((f) => ({
      ...f,
      allergies: checked
        ? [...f.allergies, value]
        : f.allergies.filter((a) => a !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="bg-white p-4 rounded shadow" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-2">Student Details</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" required />
      <input name="rollNumber" value={form.rollNumber} onChange={handleChange} placeholder="Roll Number" className="input" required />
      <select name="classDivision" value={form.classDivision} onChange={handleChange} className="input" required>
        <option value="">Select Class & Division</option>
        {classOptions.map((c) => <option key={c}>{c}</option>)}
      </select>

      <div className="mb-2">
        <label className="block mb-1">Allergies:</label>
        {allergyOptions.map((a) => (
          <label key={a} className="block">
            <input type="checkbox" value={a} checked={form.allergies.includes(a)} onChange={handleAllergyChange} />
            {a}
          </label>
        ))}
      </div>

      <input type="file" name="photo" onChange={handleChange} className="mb-2" accept="image/*" required />
      <input name="rackNumber" value={form.rackNumber} onChange={handleChange} placeholder="Rack Number" className="input" required />
      <select name="busRoute" value={form.busRoute} onChange={handleChange} className="input" required>
        <option value="">Select Bus Route</option>
        {busRoutes.map((r) => <option key={r}>{r}</option>)}
      </select>

      <button type="submit" className="bg-blue-600 text-white py-1 px-4 mt-2 rounded">Submit</button>
    </form>
  );
}
