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
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 space-y-4 w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-indigo-700 mb-2 text-center">📋 Student Details</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      />

      <input
        name="rollNumber"
        value={form.rollNumber}
        onChange={handleChange}
        placeholder="Roll Number"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      />

      <select
        name="classDivision"
        value={form.classDivision}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      >
        <option value="">Select Class & Division</option>
        {classOptions.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <div>
        <label className="block mb-1 font-medium">Allergies:</label>
        <div className="grid grid-cols-2 gap-2">
          {allergyOptions.map((a) => (
            <label key={a} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                value={a}
                checked={form.allergies.includes(a)}
                onChange={handleAllergyChange}
                className="form-checkbox h-4 w-4 text-indigo-600"
              />
              <span>{a}</span>
            </label>
          ))}
        </div>
      </div>

      <input
        type="file"
        name="photo"
        onChange={handleChange}
        className="block w-full text-sm text-gray-600 bg-white border border-gray-300 rounded p-1 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
        accept="image/*"
        required
      />

      <input
        name="rackNumber"
        value={form.rackNumber}
        onChange={handleChange}
        placeholder="Rack Number"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      />

      <select
        name="busRoute"
        value={form.busRoute}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        required
      >
        <option value="">Select Bus Route</option>
        {busRoutes.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200 font-semibold"
      >
        ➕ Submit
      </button>
    </form>
  );
}
