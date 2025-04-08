import React from "react";

export default function TemplateSwitcher({ template, setTemplate }) {
  return (
    <div className="mt-2">
      <label className="mr-2 font-semibold">Template:</label>
      <select value={template} onChange={(e) => setTemplate(e.target.value)} className="border rounded px-2 py-1">
        <option value="template1">Template 1</option>
        <option value="template2">Template 2</option>
      </select>
    </div>
  );
}
