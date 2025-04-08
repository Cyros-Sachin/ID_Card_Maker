import React, { useRef } from "react";
import QRCode from "qrcode.react"; // ✅ Correct import

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

  return (
    <div className="p-2">
      <h2 className="text-lg font-semibold mb-2">ID Card Preview</h2>
      <div
        ref={ref}
        className={`p-4 rounded shadow bg-white w-64 ${template === "template2"
            ? "border-red-500 border-2"
            : "border-blue-500 border-2"
          }`}
      >
        <img
          src={data.photo}
          alt="Student"
          className="w-24 h-24 rounded-full mx-auto mb-2"
        />
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Roll No:</strong> {data.rollNumber}
        </p>
        <p>
          <strong>Class:</strong> {data.classDivision}
        </p>
        <p>
          <strong>Rack No:</strong> {data.rackNumber}
        </p>
        <p>
          <strong>Bus Route:</strong> {data.busRoute}
        </p>
        {data.allergies.length > 0 && (
          <p>
            <strong>Allergies:</strong> {data.allergies.join(", ")}
          </p>
        )}
        <QRCode
          value={JSON.stringify({
            name: data.name,
            rollNumber: data.rollNumber,
            class: data.classDivision,
          })}
          size={80}
          className="mx-auto mt-2"
        />

      </div>
      <button
        onClick={handleDownload}
        className="bg-green-600 text-white py-1 px-3 mt-2 rounded"
      >
        Download as PNG
      </button>
    </div>
  );
}
