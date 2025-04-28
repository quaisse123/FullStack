import React from 'react';

const Cards = () => {
    return (
        <>
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800">Total Members</h2>
            <p className="text-3xl font-bold text-blue-600">120</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800">Active Members</h2>
            <p className="text-3xl font-bold text-green-600">95 %</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800">Pending Applications</h2>
            <p className="text-3xl font-bold text-yellow-600">15</p>
        </div>
        </>
    );
};

export default Cards;