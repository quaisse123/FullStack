// import '../assets/styles/Dashboard.css'
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../../components/Loading' 
// Commun components
import Sidebar from '../../components/sidebar' 
import Content from '../../components/Content'
// Spécifique components

// ===============================================================

function Liste() {
    const [showFilters,setShowFilters] = useState(false);
    return (
        <div style={{display : "flex"}}>
        <Sidebar />

          <Content>
          <main className="flex-1 p-8 bg-gray-100 min-h-screen w-full">
      {/* Titre principal */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des adhérents</h1>
        <p className="text-sm text-gray-500">Année universitaire 2024-2025</p>
      </header>

      {/* Section principale */}
      <section className="bg-white shadow rounded-xl p-6">
        {/* Barre de recherche et filtres */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Rechercher un adhérent..."
              className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Rechercher
            </button>
          </div>

          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
          </button>
        </div>

        {/* Filtres avancés */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Statut</option>
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Année</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Département</option>
                <option value="informatique">Informatique</option>
                <option value="gestion">Gestion</option>
              </select>
            </div>
          </div>
        )}

        {/* Tableau des adhérents */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-50 text-gray-700 text-sm">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Nom</th>
                <th className="px-6 py-3 text-left font-medium">Email</th>
                <th className="px-6 py-3 text-left font-medium">Statut</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm">
              <tr className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">John Doe</td>
                <td className="px-6 py-4">john.doe@example.com</td>
                <td className="px-6 py-4">Actif</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <button className="text-blue-600 hover:underline">Voir</button>
                    <button className="text-yellow-600 hover:underline">Modifier</button>
                    <button className="text-red-600 hover:underline">Supprimer</button>
                  </div>
                </td>
              </tr>
              {/* Autres lignes dynamiques ici */}
            </tbody>
          </table>
        </div>
      </section>
    </main>
          </Content>
          
        </div>
    );
}

export default Liste;
