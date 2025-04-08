import React from "react";

export default function CardList() {
  const saved = JSON.parse(localStorage.getItem("cards")) || [];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">🗂️ Previously Generated Cards</h2>
      {saved.length === 0 ? (
        <p className="text-gray-600">No cards found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {saved.map((card, index) => (
            <div key={index} className="bg-white p-2 border rounded">
              <img src={card.photo} alt="student" className="w-12 h-12 rounded-full mb-1 mx-auto" />
              <p className="text-sm font-semibold text-center">{card.name}</p>
              <p className="text-xs text-center">{card.rollNumber}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
