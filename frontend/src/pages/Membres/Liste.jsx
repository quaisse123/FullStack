import '../../assets/styles/Liste.css'
import { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import Sidebar from '../../components/sidebar';
import Content from '../../components/Content';

function Liste() {
  const [showFilters, setShowFilters] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [statut, setStatut] = useState("");
  const [annee, setAnnee] = useState("");
  const [filiere, setFiliere] = useState("");
  const [adherents, setAdherents] = useState([]);

  const fetchAdherents = () => {
    const params = new URLSearchParams();
    if (inputValue) params.append("search", inputValue);
    if (statut) params.append("statut", statut);
    if (annee) params.append("annee", annee);
    if (filiere) params.append("filiere", filiere);

    fetch(`http://localhost:8000/Apimembres/liste?${params.toString()}`)
      .then(res => res.json())
      .then(data => setAdherents(data))
      .catch(err => console.error("Erreur fetch :", err));
  };

  useEffect(() => {
    fetchAdherents();
  }, [inputValue, statut, annee, filiere]);

  if (!adherents) {
    return <Content ><Loading /></Content>;
  }

  const handleChange = (event) => setInputValue(event.target.value);

  function ShowProfil   (id) {
    window.location.href = `/membres/profil/${id}`;
  }

  function deleteAdherent(id) {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer cet adhérent ?")) {
    fetch(`http://localhost:8000/Apimembres/supprimer/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Adhérent supprimé avec succès !");
          fetchAdherents(); // Recharger la liste après suppression
        } else {
          alert(data.error || "Erreur lors de la suppression de l'adhérent.");
        }
      })
      .catch(err => {
        console.error("Erreur de suppression :", err);
        alert("Erreur de connexion au serveur.");
      });
  }
}

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <Content>
        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen w-full">
          <div className='mb-5'>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Liste des adhérents</h1>
            <p className="text-sm text-gray-500">Année universitaire 2024-2025</p>
          </div>

          <section className="bg-white shadow rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="search"
                  onChange={handleChange}
                  value={inputValue}
                  placeholder="Rechercher un adhérent..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  className="bg-blue-500 w-full sm:w-auto text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  Filtres
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {showFilters && (
              <div id='filters' className="bg-gray-50 p-4 sm:p-6 rounded-2xl mb-6 border border-gray-200 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
                  <h3 className="text-gray-700 font-semibold text-md">Filtres avancés</h3>
                  <button
                    onClick={() => {
                      setStatut('');
                      setAnnee('');
                      setFiliere('');
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Réinitialiser
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <label className="text-gray-600 text-sm mb-1">Statut</label>
                    <select
                      value={statut}
                      onChange={(e) => setStatut(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="">Tous les statuts</option>
                      <option value="Approuvé">Approuvé</option>
                      <option value="Non approuvé">Non approuvé</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-gray-600 text-sm mb-1">Année d’adhésion</label>
                    <select
                      value={annee}
                      onChange={(e) => setAnnee(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="">Toutes les années</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-gray-600 text-sm mb-1">Filière</label>
                    <select
                      value={filiere}
                      onChange={(e) => setFiliere(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="">Toutes les filières</option>
                      <option value="IAGI">IAGI</option>
                      <option value="CS2C">CS2C</option>
                      <option value="GEM">GEM</option>
                      <option value="MSEI">MSEI</option>
                      <option value="GSMI">GSMI</option>
                      <option value="GSI">GSI</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div id='tableContainer' className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md divide-y divide-gray-200">
  <thead>
    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
      <th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-12">Photo</th>
      <th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nom</th>
      <th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-24">Date</th>
      <th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-28">Téléphone</th>
      <th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-16">Niveau</th>
      <th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-16">Filière</th>
      <th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-24">Statut</th>
      <th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-16">Actions</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {adherents.length === 0 && (
      <tr>
        <td colSpan="8" className="px-4 py-6 text-center text-gray-500 text-sm">
          <div className="flex flex-col items-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="mt-2 font-medium">Aucun résultat trouvé.</p>
          </div>
        </td>
      </tr>
    )}
    {adherents.map((adherent, index) => (
      <tr 
        key={index} 
        className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
        onClick={() => ShowProfil(adherent.user.id)}
      >
        <td className="px-2 py-2 whitespace-nowrap">
          <div className="flex items-center justify-center">
            <div className="h-7 w-7 rounded-full overflow-hidden border border-gray-200">
              <img 
                src={`http://localhost:8000${adherent.photo}`} 
                alt={`${adherent.user.first_name}`}
                className="h-full w-full object-cover"
                onError={(e) => {e.target.src = "https://via.placeholder.com/40?text=?"}}
              />
            </div>
          </div>
        </td>
        <td className="px-2 py-2 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{adherent.user.first_name} {adherent.user.last_name}</div>
          <div className="text-xs text-gray-500 truncate max-w-xs">{adherent.user.email}</div>
        </td>
        <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-700">
          {new Date(adherent.date_adhesion).toLocaleDateString('fr-FR', { year: '2-digit', month: '2-digit', day: '2-digit' })}
        </td>
        <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-700">{adherent.telephone}</td>
        <td className="px-2 py-2 whitespace-nowrap">
          <span className="px-1.5 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-blue-800">
            {adherent.niveau}
          </span>
        </td>
        <td className="px-2 py-2 whitespace-nowrap">
          <span className="px-1.5 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-purple-100 text-purple-800">
            {adherent.filiere}
          </span>
        </td>
        <td className="px-2 py-2 whitespace-nowrap">
          <span className={`px-1.5 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${
            adherent.is_approved 
              ? 'bg-green-100 text-green-800' 
              : 'bg-amber-100 text-amber-800'
          }`}>
            {adherent.is_approved ? 'Approuvé' : 'Non approuvé'}
          </span>
        </td>
        <td className="px-2 py-2 whitespace-nowrap">
          <div className="flex items-center justify-center space-x-1">
            
            <button 
              className="text-red-600 hover:text-red-900 focus:outline-none" 
              onClick={(e) => {
                e.stopPropagation();
                deleteAdherent(adherent.user.id);
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    ))}
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
