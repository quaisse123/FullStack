import React from 'react';

const events = [
    {
        name: "Conférence sur l'IA",
        time: "21:54",
        location: "Amphi 1",
        places: "18 / 81 places",
        description: "Un événement pour explorer les dernières avancées dans le domaine.",
        status: "Disponible",
        day: "12",
        month: "juil."
    },
    {
        name: "Atelier Django",
        time: "21:54",
        location: "Salle B204",
        places: "48 / 76 places",
        description: "Une session pratique pour apprendre en équipe.",
        status: "Disponible",
        day: "22",
        month: "juin"
    },
    {
        name: "Hackathon Étudiant",
        time: "21:54",
        location: "Amphi central",
        places: "51 / 92 places",
        description: "Compétition entre étudiants sur 48h.",
        status: "Disponible",
        day: "12",
        month: "juil."
    }
];

const Events = () => {
    return (
        <div
            onClick={() => { window.location.href = "/events/upcoming"; }}
            className="col-span-1 md:col-span-2 bg-white shadow-xl rounded-2xl p-6 cursor-pointer hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 border border-blue-100"
        >
            <div className="flex items-center mb-4">
                <svg className="w-7 h-7 text-blue-500 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="4" stroke="currentColor" />
                    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" />
                </svg>
                <h2 className="text-xl font-bold text-blue-700 tracking-tight">Événements à venir</h2>
            </div>
            <ul className="space-y-3">
                {events.map((event, idx) => (
                    <li
                        key={idx}
                        className="flex flex-col md:flex-row items-start md:items-center bg-white rounded-lg shadow-sm px-4 py-3 hover:bg-blue-50 transition"
                    >
                        <div className="flex items-center mr-4 mb-2 md:mb-0">
                            <div className="flex flex-col items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mr-3">
                                <span className="text-lg font-bold text-blue-700">{event.day}</span>
                                <span className="text-xs text-blue-500">{event.month}</span>
                            </div>
                            <div className="flex flex-col justify-between h-full">
                                <span className="font-semibold text-gray-800 mb-1">{event.name}</span>
                                <div className="text-xs text-gray-500">{event.time} &bull; {event.location}</div>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between h-full">
                            <div className="text-sm text-gray-700 mb-2">{event.description}</div>
                            <div className="flex items-center text-xs text-gray-500">
                                <span className="mr-2">{event.places}</span>
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded">{event.status}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Events;
