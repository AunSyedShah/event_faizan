// src/ExpoManagement.js
import React, { useState } from 'react';
import ExpoForm from './ExpoForm';

const ExpoManagement = () => {
  const [expos, setExpos] = useState([]);
  const [selectedExpo, setSelectedExpo] = useState(null);

  const handleAddExpo = (expo) => {
    setExpos([...expos, expo]);
  };

  const handleDeleteExpo = (index) => {
    const updatedExpos = expos.filter((_, i) => i !== index);
    setExpos(updatedExpos);
  };

  const handleExpoClick = (expo) => {
    setSelectedExpo(expo);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expo Management</h1>
      <ExpoForm onSubmit={handleAddExpo} />
      <ul className="mt-4 space-y-2">
        {expos.map((expo, index) => (
          <li
            key={index}
            className="p-4 bg-white shadow rounded-lg cursor-pointer"
            onClick={() => handleExpoClick(expo)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{expo.title}</h2>
                <p>{expo.date}</p>
                <p>{expo.location}</p>
                <p>{expo.description}</p>
                <p>{expo.theme}</p>
                <p>Booths: {expo.booths}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteExpo(index);
                }}
                className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedExpo && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">{selectedExpo.title} Booths</h2>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: selectedExpo.booths }, (_, i) => (
              <div
                key={i}
                className="p-4 border border-gray-300 rounded-md shadow-sm"
              >
                Booth {i + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpoManagement;
