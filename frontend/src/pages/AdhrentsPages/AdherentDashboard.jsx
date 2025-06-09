import '../../assets/styles/Dashboard.css';
import { useState } from 'react';
import Sidebar from '../../components/Adherent/SidebarAdherent';
import Content from '../../components/Content';

// Simulated data
const annonces = [
    {
        id: 1,
        title: "Bienvenue sur votre espace adhérent !",
        message: "N'oubliez pas de mettre à jour vos informations personnelles.",
        date: "2024-06-01",
    },
    {
        id: 2,
        title: "Assemblée Générale",
        message: "L'assemblée générale aura lieu le 15 juin à 18h.",
        date: "2024-06-05",
    },
];

const eventsAVenir = [
    {
        id: 1,
        name: "Conférence sur l'IA",
        date: "2024-06-20",
        location: "Amphi 1",
    },
    {
        id: 2,
        name: "Atelier Django",
        date: "2024-07-10",
        location: "Salle 212",
    },
];

const participations = [
    {
        id: 1,
        name: "Conférence sur l'entrepreneuriat",
        date: "2024-04-12",
        location: "Auditorium",
    },
    {
        id: 2,
        name: "Journée Sportive",
        date: "2024-03-05",
        location: "Stade Municipal",
    },
];

// Simulated progress (annual activity)
const annualActivity = 68; // en pourcentage

function ProgressBar({ value }) {
    return (
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4 shadow-inner">
            <div
                className="h-6 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-500"
                style={{
                    width: `${value}%`,
                    background: "linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)",
                }}
            >
                {value}%
            </div>
        </div>
    );
}
const ShowAnnonces = () => {
    window.location.href = '/adherent-annonces'; // Redirection vers la page des annonces
}
const ShowEvents = () => {
    window.location.href = '/adherent-events'; // Redirection vers la page des événements
}
function Dashboard() {
    // Pas de fetch, tout est simulé ici

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #f4f6f8 0%, #e0e7ef 100%)' }}>
            <Sidebar />
            <Content>
                <main className="flex-1 p-8">
                    
                    <div className='mb-5'>
                        <h1 className="text-3xl font-bold text-blue-900">
                        Tableau de bord - Adhérent
                        </h1>
                        <p className="text-sm text-gray-500">Année universitaire 2024-2025</p>
                    </div>

                    {/* Utilisation de grid pour le layout principal */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Activité annuelle */}
                        <section className="lg:col-span-1 mb-0">
                            <h2 className="text-xl font-semibold text-blue-800 mb-2">Votre activité annuelle</h2>
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <ProgressBar value={annualActivity} />
                                <p className="text-gray-700 mt-2">Vous avez participé à {annualActivity}% des activités cette année.</p>
                            </div>
                        </section>

                        {/* Annonces */}
                        <section onClick={ShowAnnonces} className="lg:col-span-2 mb-0 cursor-pointer ">
                            <h2 className="text-xl font-semibold text-blue-800 mb-2">Annonces du bureau</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {annonces.map(a => (
                                    <div key={a.id} className="bg-gradient-to-r from-blue-100 to-blue-50 border-l-4 hover:scale-105 transition-transform duration-300 border-blue-500 rounded-lg shadow p-4">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-blue-900">{a.title}</span>
                                            <span className="text-xs text-gray-500">{a.date}</span>
                                        </div>
                                        <p className="text-gray-700">{a.message}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Événements à venir et Participations antérieures côte à côte */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                        {/* Événements à venir */}
                        <section>
                            <h2 className="text-xl font-semibold text-blue-800 mb-2">Événements à venir</h2>
                            <div className="space-y-4">
                                {eventsAVenir.map(ev => (
                                    <div key={ev.id} onClick={ShowEvents} className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-cyan-400 cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <div className="font-bold text-cyan-700">{ev.name}</div>
                                        <div className="text-gray-600 text-sm">{ev.date} — {ev.location}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Participations antérieures */}
                        <section>
                            <h2 className="text-xl font-semibold text-blue-800 mb-2">Mes participations</h2>
                            <div className="space-y-4">
                                {participations.map(ev => (
                                    <div key={ev.id} className="bg-gray-50 rounded-xl shadow p-5 border-l-4 border-green-400">
                                        <div className="font-bold text-green-700">{ev.name}</div>
                                        <div className="text-gray-600 text-sm">{ev.date} — {ev.location}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </Content>
        </div>
    );
}

export default Dashboard;
