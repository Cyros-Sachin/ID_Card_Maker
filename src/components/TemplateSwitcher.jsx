import React from "react";

export default function TemplateSwitcher({ template, setTemplate }) {
  return (
    <div className="mt-2">
      <label className="mr-2 font-semibold">Template:</label>
      <select
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="modern">Modern Gradient</option>
        <option value="minimal">Classic Minimal</option>
        <option value="neon">Techie Neon</option>
        <option value="school">School-Themed</option>
        <option value="pastel">Elegant Pastel</option>
      </select>
    </div>
  );
}
