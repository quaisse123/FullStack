import React from 'react';

const Notifications = () => {
    const adminMessages = [
        {
            id: 1,
            author: "mohamed.bensalem",
            date: "25/05/2025 13:52:45",
            content: "N'oubliez pas de mettre à jour vos informations personnelles."
        },
        {
            id: 2,
            author: "Imane_Nouam",
            date: "25/05/2025 13:53:16",
            content: "La réunion du comité du club aura lieu ce jeudi à 18h en salle B103. Merci à tous les membres de préparer un point sur l’état d’avancement de leurs tâches avant la rencontre."
        },
        {
            id: 3,
            author: "admin",
            date: "25/05/2025 13:54:00",
            content: "L'assemblée générale aura lieu le 15 juin à 18h."
        }
    ];

    const MAX_LENGTH = 100;

    const [expanded, setExpanded] = React.useState({});

    const handleToggle = (id) => {
        setExpanded(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="col-span-1  bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
            <ul className="mt-2 space-y-4">
                {adminMessages.map(msg => (
                    <li key={msg.id} onClick={() => {window.location.href="/annonces"}} 
                    className="text-sm text-gray-700 border-b pb-2 cursor-pointer ">
                        <div>
                            {msg.content.length > MAX_LENGTH && !expanded[msg.id] ? (
                                <>
                                    {msg.content.slice(0, MAX_LENGTH)}...
                                    <button
                                        className="text-blue-500 ml-2 underline"
                                        onClick={() => handleToggle(msg.id)}
                                    >
                                        Voir plus
                                    </button>
                                </>
                            ) : (
                                <>
                                    {msg.content}
                                    {msg.content.length > MAX_LENGTH && (
                                        <button
                                            className="text-blue-500 ml-2 underline"
                                            onClick={() => handleToggle(msg.id)}
                                        >
                                            Voir moins
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            Par <span className="font-semibold">{msg.author}</span> le {msg.date}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;