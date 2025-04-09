import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";

export default function IDCardPreview({ data, template }) {
  const ref = useRef();

  const handleDownload = () => {
    toPng(ref.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${data.name}_IDCard.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  const templateStyles = {
    modern: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-indigo-400",
    minimal: "bg-white text-gray-800 border-gray-300",
    neon: "bg-black text-green-400 border-green-500",
    school: "bg-yellow-100 text-blue-900 border-blue-500",
    pastel: "bg-pink-100 text-purple-800 border-purple-300",
  };

  const selectedStyle = templateStyles[template] || templateStyles.minimal;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-xl font-bold text-center text-indigo-700 mb-4">🪪 ID Card Preview</h2>

      <div
        ref={ref}
        className={`p-4 rounded-lg shadow-md transition-all duration-300 w-full border-4 ${selectedStyle}`}
      >
        <img
          src={data.photo}
          alt="Student"
          className="w-24 h-24 rounded-full mx-auto border-2 border-white mb-3"
        />

        <div className="text-sm space-y-1 text-left">
          <p><strong>👤 Name:</strong> {data.name}</p>
          <p><strong>🆔 Roll No:</strong> {data.rollNumber}</p>
          <p><strong>🏫 Class:</strong> {data.classDivision}</p>
          <p><strong>📦 Rack No:</strong> {data.rackNumber}</p>
          <p><strong>🚌 Bus Route:</strong> {data.busRoute}</p>

          {data.allergies.length > 0 && (
            <p><strong>⚠️ Allergies:</strong> {data.allergies.join(", ")}</p>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <QRCodeCanvas
            value={JSON.stringify({
              name: data.name,
              rollNumber: data.rollNumber,
              class: data.classDivision,
            })}
            size={80}
            className="rounded"
          />
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition duration-200"
      >
        ⬇️ Download as PNG
      </button>
    </div>
  );
}
