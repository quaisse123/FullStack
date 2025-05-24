import { useState, useEffect } from "react";
import Loading from '../../components/Loading';
import Sidebar from '../../components/sidebar';
import Content from '../../components/Content';

function UpComing () {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
    const [filterStatus, setFilterStatus] = useState("upcoming");
    const [filterPeriod, setFilterPeriod] = useState("all");
    

    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) {params.append("search", searchTerm);}
        if (filterStatus) {params.append("status", filterStatus);}
        if (filterPeriod) {params.append("period", filterPeriod);}
        

        fetch(`http://localhost:8000/Apievents?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [searchTerm, filterStatus, filterPeriod]);

    const addEvent = () => {
        window.location.href = "/events/new";
    }

    if (loading) return <Loading />;
    
    return (
      <>
      <Sidebar />
      <Content>
        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen w-full">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Événements à venir</h1>
          <p className="text-gray-600 text-lg">Consultez la liste des prochains événements et restez informé des activités à venir.</p>
        </div>

        {/* Search & Button */}
        <div className="mb-8 flex flex-col md:flex-row items-stretch gap-4 w-full max-w-5xl">
          <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Rechercher un événement..."
          className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          </div>
          <button onClick={addEvent} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group">
          <svg className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Ajouter un événement
          </button>
        </div>

        {/* Filtres stylés */}
        <div className="mb-10 w-full max-w-5xl mx-auto flex flex-wrap gap-3 items-center justify-start">
          {/* À venir / Passé */}
          <div className="flex gap-2 bg-white rounded-xl shadow border border-gray-200 px-2 py-1">
          <button
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
          filterStatus === "upcoming"
            ? "bg-blue-600 text-white shadow"
            : "text-gray-700 hover:bg-blue-50"
          }`}
          onClick={() => setFilterStatus("upcoming")}
          >
          À venir
          </button>
          <button
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
          filterStatus === "past"
            ? "bg-gray-400 text-white shadow"
            : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setFilterStatus("past")}
          >
          Passé
          </button>
          </div>
          
          <div className="flex gap-2 bg-white rounded-xl shadow border border-gray-200 px-2 py-1">
          <button
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
          filterPeriod === "week"
            ? "bg-blue-500 text-white shadow"
            : "text-gray-700 hover:bg-blue-50"
          }`}
          onClick={() => setFilterPeriod("week")}
          >
          Cette semaine
          </button>
          <button
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
          filterPeriod === "month"
            ? "bg-blue-500 text-white shadow"
            : "text-gray-700 hover:bg-blue-50"
          }`}
          onClick={() => setFilterPeriod("month")}
          >
          Ce mois-ci
          </button>
          <button
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
          filterPeriod === "all"
            ? "bg-blue-500 text-white shadow"
            : "text-gray-700 hover:bg-blue-50"
          }`}
          onClick={() => setFilterPeriod("all")}
          >
          Toutes les dates
          </button>
          </div>

          </div>
        {/* Liste des événements */}
          <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
          {events.map((event) => (
          <div
          style={{cursor: "pointer"}}
          key={event.id}
          className={`rounded-2xl border group w-full transition-transform hover:scale-[1.01] ${
            filterStatus === "past"
            ? "bg-gray-100 border-gray-300"
            : "bg-white shadow-md border-gray-200"
          }`}
          >
          <div className="relative p-5">
            {/* Badge date */}
            <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-xl text-sm font-semibold shadow
            ${filterStatus === "past" ? "bg-gray-400 text-white" : "bg-blue-600 text-white"}
            `}>
            <div className="text-center leading-none">
            <div className="text-base font-bold">
            {new Date(event.date).getDate()}
            </div>
            <div className="text-xs opacity-90">
            {new Date(event.date).toLocaleDateString("fr-FR", {
              month: "short",
            })}
            </div>
            </div>
            </div>

            {/* Titre */}
            <h3 className={`text-xl font-semibold mb-2 pr-16 group-hover:text-blue-600 transition-colors ${
            filterStatus === "past" ? "text-gray-700" : "text-gray-900"
            }`}>
            {event.title}
            </h3>

            {/* Infos */}
            <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
            <svg className={`h-5 w-5 ${filterStatus === "past" ? "text-gray-400" : "text-blue-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {new Date(event.date).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            })}
            </div>

            <div className="flex items-center gap-2">
            <svg className={`h-5 w-5 ${filterStatus === "past" ? "text-gray-400" : "text-blue-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
            </div>

            <div className="flex items-center gap-2">
            <svg className={`h-5 w-5 ${filterStatus === "past" ? "text-gray-400" : "text-blue-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {event.places_dispo} / {event.capacite} places
            </div>
            </div>

            {/* Description */}
            {event.description && (
            <p className={`text-sm mt-3 ${
            filterStatus === "past" ? "text-gray-700" : "text-gray-600"
            }`}>
            {event.description}
            </p>
            )}

            {/* Past event label */}
            {filterStatus === "past" && (
            <div className="mt-4 text-xs font-semibold text-gray-600 italic flex items-center gap-1">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2M12 7v4m0 0v4m0-4h4m-4 0H8" />
            </svg>
            Cet événement est passé
            </div>
            )}
          </div>

          {/* Footer */}
          <div className={`px-5 py-3 border-t flex items-center ${
            filterStatus === "past" ? "bg-gray-200 border-gray-300" : "bg-gray-50 border-gray-200"
          }`}>
            <div className="flex items-center gap-2 text-sm font-medium">
            <div
            className={`w-3 h-3 rounded-full ${
            filterStatus === "past"
              ? "bg-gray-400"
              : event.places_dispo === 0
              ? "bg-red-500"
              : event.places_dispo < event.capacite * 0.2
              ? "bg-orange-500"
              : "bg-green-500"
            }`}
            ></div>
            <span
            className={`${
            filterStatus === "past"
              ? "text-gray-700"
              : event.places_dispo === 0
              ? "text-red-600"
              : event.places_dispo < event.capacite * 0.2
              ? "text-orange-600"
              : "text-green-600"
            }`}
            >
            {filterStatus === "past"
            ? "Événement passé"
            : event.places_dispo === 0
            ? "Complet"
            : event.places_dispo < event.capacite * 0.2
            ? "Places limitées"
            : "Disponible"}
            </span>
            </div>
          </div>
          </div>
          ))}
          </div>
          
        {events.length === 0 && (
          <div className="text-center py-16">
          <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun événement</h3>
          <p className="text-gray-600 mb-6">Il n'y a actuellement aucun événement à venir.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300">
            Créer le premier événement
          </button>
          </div>
        )}
        </main>
      </Content>
      </>
    );
}

export default UpComing;
