// src/ExpoManagement.js
import React, { useState } from 'react';
import ExpoForm from './ExpoForm';
import ExhibitorManagement from './ExhibitorManagement';

const ExpoManagement = () => {
  const [expos, setExpos] = useState([
    { id: 1, title: 'Tech Expo', date: '2024-09-15', location: 'Convention Center', description: 'A tech expo', theme: 'Technology', booths: Array(16).fill({ status: 'free' }) },
    { id: 2, title: 'Health Expo', date: '2024-10-20', location: 'Health Center', description: 'A health expo', theme: 'Health', booths: Array(20).fill({ status: 'free' }) },
  ]);
  const [selectedExpo, setSelectedExpo] = useState(null);
  const [selectedExhibitor, setSelectedExhibitor] = useState(null);

  const handleAddExpo = (expo) => {
    const initializedBooths = Array.from({ length: expo.booths }, () => ({
      status: 'free',
    }));
    setExpos([...expos, { ...expo, booths: initializedBooths }]);
  };

  const handleDeleteExpo = (index) => {
    const updatedExpos = expos.filter((_, i) => i !== index);
    setExpos(updatedExpos);
  };

  const handleExpoClick = (expo) => {
    setSelectedExpo(expo);
    setSelectedExhibitor(null);
  };

  const handleBoothClick = (index) => {
    if (!selectedExhibitor) {
      alert('Please select an exhibitor to assign a booth.');
      return;
    }

    const updatedBooths = selectedExpo.booths.map((booth, i) =>
      i === index ? { ...booth, status: 'occupied' } : booth
    );
    setSelectedExpo({ ...selectedExpo, booths: updatedBooths });
    setExpos(
      expos.map((expo) =>
        expo.id === selectedExpo.id ? { ...expo, booths: updatedBooths } : expo
      )
    );
  };

  const getBoothColor = (status) => {
    switch (status) {
      case 'occupied':
        return 'bg-red-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'free':
      default:
        return 'bg-green-500';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expo Management</h1>
      <ExpoForm onSubmit={handleAddExpo} />
      <ul className="mt-4 space-y-2">
        {expos.map((expo, index) => (
          <li
            key={expo.id}
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
                <p>Booths: {expo.booths.length}</p>
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
            {selectedExpo.booths.map((booth, index) => (
              <div
                key={index}
                className={`p-4 border border-gray-300 rounded-md shadow-sm cursor-pointer ${getBoothColor(booth.status)}`}
                onClick={() => handleBoothClick(index)}
              >
                Booth {index + 1}
                {booth.status === 'occupied' && <p>Occupied</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      <ExhibitorManagement
        expos={expos}
        onSelectExhibitor={setSelectedExhibitor}
      />
    </div>
  );
};

export default ExpoManagement;
