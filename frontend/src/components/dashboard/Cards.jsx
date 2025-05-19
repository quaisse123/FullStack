import React from 'react';
import '../../assets/styles/Dashboard.css'
import { useEffect, useState } from 'react';
const Cards = () => {
    const [totalMembers, setTotalMembers] = useState(0);

    useEffect(() => {
    fetch('http://localhost:8000/dashboard/', {
        credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            alert("Non connecté !");
        } else {
            setTotalMembers(data.nbr_adherents || 0);
        }
    })
    .catch(error => {
        alert("Erreur fetch : " + error.message);
    });
}, []);



    return (
        <>
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-800">Total Members</h2>
                <p className="text-3xl font-bold text-blue-600">{totalMembers}</p>
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