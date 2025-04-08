import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import IDCardPreview from "./components/IDCardPreview";
import TemplateSwitcher from "./components/TemplateSwitcher";
import "./index.css";

// 🔧 Define initial empty form structure
const initialFormData = {
  name: "",
  rollNumber: "",
  classDivision: "",
  rackNumber: "",
  busRoute: "",
  photo: "",
  allergies: [],
};

export default function App() {
  const [studentData, setStudentData] = useState(null);
  const [template, setTemplate] = useState("template1");
  const [formData, setFormData] = useState(initialFormData);
  const [savedEntries, setSavedEntries] = useState([]);

  // 🔄 Load saved cards from localStorage when app starts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cards")) || [];
    setSavedEntries(saved);
  }, []);

  const handleFormSubmit = (data) => {
    setStudentData(data);
    setFormData(data);

    const updatedEntries = [...savedEntries, data];
    localStorage.setItem("cards", JSON.stringify(updatedEntries));
    setSavedEntries(updatedEntries);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🎓 Smart Student ID Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StudentForm onSubmit={handleFormSubmit} />
        {studentData && (
          <>
            <TemplateSwitcher template={template} setTemplate={setTemplate} />
            <IDCardPreview data={studentData} template={template} />
          </>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Saved Cards</h2>
        {savedEntries.length === 0 ? (
          <p className="text-sm text-gray-500">No saved cards yet.</p>
        ) : (
          savedEntries.map((entry, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-3 rounded shadow mb-2"
            >
              <div>
                <p className="text-sm font-medium">{entry.name}</p>
                <p className="text-xs text-gray-600">Roll No: {entry.rollNumber}</p>
              </div>
              <button
                className="bg-blue-500 text-white text-sm px-3 py-1 rounded"
                onClick={() => {
                  setFormData(entry);
                  setStudentData(entry); // 👈 Load and Preview
                }}
              >
                Load & Preview
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
