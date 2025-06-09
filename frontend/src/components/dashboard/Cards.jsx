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

    const redirectToMembersList = () => {
        window.location.href = "/membres/liste";
    };

    const cardStyle = { cursor: 'pointer'};
        return (
        <>
            <div
                onClick={redirectToMembersList}
                className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
                style={cardStyle}
            >
                <h2 className="text-lg font-semibold text-gray-800">Nombre total d’adhérents</h2>
                <p className="text-3xl font-bold text-blue-600">{totalMembers}</p>
            </div>
            <div
                className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
                style={cardStyle}
            >
                <h2 className="text-lg font-semibold text-gray-800">Adhérents actifs</h2>
                <p className="text-3xl font-bold text-green-600">95 %</p>
            </div>
            <div
                className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
                style={cardStyle}
            >
                <h2 className="text-lg font-semibold text-gray-800">Demandes en attente</h2>
                <p className="text-3xl font-bold text-yellow-600">15</p>
            </div>
        </>
    );
};

export default Cards;