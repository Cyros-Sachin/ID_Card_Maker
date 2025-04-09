import React from "react";

export default function CardList() {
  const saved = JSON.parse(localStorage.getItem("cards")) || [];

  return (
    <div className="mt-10 max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        🗂️ Previously Generated Cards
      </h2>

      {saved.length === 0 ? (
        <p className="text-gray-500 italic">No cards found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {saved.map((card, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-4 shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={card.photo}
                alt="student"
                className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-indigo-500"
              />
              <div className="text-center">
                <p className="text-base font-semibold text-gray-800">
                  {card.name}
                </p>
                <p className="text-sm text-gray-500">{card.rollNumber}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
