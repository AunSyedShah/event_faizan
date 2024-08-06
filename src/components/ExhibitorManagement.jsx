// src/components/ExhibitorManagement.js
import React, { useState } from 'react';

const ExhibitorManagement = ({ expos, onSelectExhibitor }) => {
  const [registrations, setRegistrations] = useState([
    { id: 1, name: 'Exhibitor A', status: 'pending', expoId: 1 },
    { id: 2, name: 'Exhibitor B', status: 'approved', expoId: 2 },
    { id: 3, name: 'Exhibitor C', status: 'rejected', expoId: 1 },
    { id: 4, name: 'Exhibitor D', status: 'pending', expoId: 2 },
  ]);
  const [selectedExhibitor, setSelectedExhibitor] = useState(null);

  const handleApprove = (id) => {
    setRegistrations((prevRegistrations) =>
      prevRegistrations.map((registration) =>
        registration.id === id ? { ...registration, status: 'approved' } : registration
      )
    );
  };

  const handleReject = (id) => {
    setRegistrations((prevRegistrations) =>
      prevRegistrations.map((registration) =>
        registration.id === id ? { ...registration, status: 'rejected' } : registration
      )
    );
  };

  const handleSelectExhibitor = (exhibitor) => {
    setSelectedExhibitor(exhibitor);
    onSelectExhibitor(exhibitor);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Exhibitor Management</h2>
      {expos.map((expo) => (
        <div key={expo.id} className="mb-6">
          <h3 className="text-lg font-semibold">{expo.title}</h3>
          <ul className="mt-2 space-y-2">
            {registrations
              .filter((registration) => registration.expoId === expo.id)
              .map((registration) => (
                <li
                  key={registration.id}
                  className={`p-4 border rounded-md shadow-sm ${
                    registration.status === 'pending'
                      ? 'bg-yellow-100'
                      : registration.status === 'approved'
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p>Name: {registration.name}</p>
                      <p>Status: {registration.status}</p>
                    </div>
                    <div className="space-x-2">
                      {registration.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(registration.id)}
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(registration.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {registration.status === 'approved' && (
                        <button
                          onClick={() => handleSelectExhibitor(registration)}
                          className={`px-4 py-2 ${
                            selectedExhibitor?.id === registration.id
                              ? 'bg-blue-700'
                              : 'bg-blue-500'
                          } text-white rounded-md`}
                        >
                          {selectedExhibitor?.id === registration.id
                            ? 'Selected'
                            : 'Select'}
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExhibitorManagement;
