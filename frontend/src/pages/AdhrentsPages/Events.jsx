import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Adherent/SidebarAdherent";
import Content from "../../components/Content";
import Loading from "../../components/Loading";

function AdhUpComing() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("upcoming");
    const [filterPeriod, setFilterPeriod] = useState("all");

    // Debounce la recherche
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 400);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (debouncedSearch) params.append("search", debouncedSearch);
        if (filterStatus) params.append("status", filterStatus);
        if (filterPeriod) params.append("period", filterPeriod);

        setLoading(true);
        fetch(`http://localhost:8000/Apievents?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                setEvents(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [debouncedSearch, filterStatus, filterPeriod]);

    const ShowParticipationForm = () => {
        window.location.href = "/adherent-dashboard";
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-8">
                <Content>
                    <div className='mb-5'>
                        <h1 className="text-3xl font-bold text-blue-900">
                        Événements à venir
                        </h1>
                        <p className="text-sm text-gray-500">Année universitaire 2024-2025</p>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center mb-8 gap-4">
                        <input
                            type="text"
                            placeholder="Rechercher un événement..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border w-full border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        >
                            <option value="upcoming">À venir</option>
                            <option value="past">Passés</option>
                            <option value="all">Tous</option>
                        </select>
                        <select
                            value={filterPeriod}
                            onChange={(e) => setFilterPeriod(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        >
                            <option value="all">Toutes périodes</option>
                            <option value="week">Cette semaine</option>
                            <option value="month">Ce mois</option>
                        </select>
                    </div>
                    {loading ? (
                        <Loading />
                    ) : (
                        <div>
                            {events.length === 0 ? (
                                <div className="text-center text-gray-500 py-12">Aucun événement trouvé.</div>
                            ) : (
                                <ul className="grid grid-cols-1 gap-6">
                                    {events.map((event) => (
                                        <li key={event.id} className="bg-white border border-gray-200 rounded-xl shadow p-6 flex flex-col gap-2 hover:shadow-lg transition">
                                            <h3 className="font-bold text-xl text-blue-700 mb-1">{event.title}</h3>
                                            <p className="text-gray-600 mb-2">{event.description}</p>
                                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                                <span className="font-semibold mr-2">Date:</span>
                                                {event.date}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                                <span className="font-semibold mr-2">Places:</span>
                                                {event.places_dispo ?? 0} / {event.capacite ?? 0}
                                            </div>
                                            {filterStatus !== "past" && (
                                                <button
                                                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                                    disabled={event.places_dispo === 0}
                                                    onClick={ShowParticipationForm}
                                                >
                                                    Participer
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </Content>
            </div>
        </div>
    );
}
export default AdhUpComing;