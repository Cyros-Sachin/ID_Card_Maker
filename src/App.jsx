import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import IDCardPreview from "./components/IDCardPreview";
import TemplateSwitcher from "./components/TemplateSwitcher";
import "./index.css";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 shadow-sm">
        🎓 Smart Student ID Generator
      </h1>

      {/* FORM + PREVIEW SECTION */}
      <div className="flex justify-center">
        <div className={`w-full ${studentData ? "max-w-5xl" : "max-w-md"} transition-all duration-300`}>
          <div className={`flex flex-col md:flex-row gap-6`}>

            {/* Form */}
            <div className={`${studentData ? "md:w-1/2" : "w-full"}`}>
              <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200">
                <StudentForm onSubmit={handleFormSubmit} />
              </div>
            </div>

            {/* Preview */}
            {studentData && (
              <div className="md:w-1/2">
                <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200">
                  <TemplateSwitcher template={template} setTemplate={setTemplate} />
                  <IDCardPreview data={studentData} template={template} />

                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* SAVED CARDS */}
      <div className="mt-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">📁 Saved Cards</h2>
        {savedEntries.length === 0 ? (
          <p className="text-gray-500 italic">No saved cards yet.</p>
        ) : (
          <div className="space-y-3">
            {savedEntries.map((entry, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300"
              >
                <div>
                  <p className="text-md font-semibold text-gray-800">{entry.name}</p>
                  <p className="text-sm text-gray-500">Roll No: {entry.rollNumber}</p>
                </div>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded transition"
                  onClick={() => {
                    setFormData(entry);
                    setStudentData(entry);
                  }}
                >
                  Load & Preview
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
