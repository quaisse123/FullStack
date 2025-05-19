import { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import Sidebar from '../../components/sidebar';
import Content from '../../components/Content';
import { useParams } from 'react-router-dom';
function Profil() {
  const { id } = useParams();
  const [Adherent, setAdherent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/auth/profile/${id}/`)
      .then(res => res.json())
      .then(data => setAdherent(data[0]))
      .catch(err => console.error(err));
  }, [id]);
  console.log(Adherent);
  if (!Adherent) return <Loading />;
  return (
  <div className="flex flex-col md:flex-row">
    <Sidebar />
    <Content>
      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen w-full">
        {/* En-tête du profil avec photo et nom */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                <img 
                  src={`http://localhost:8000${Adherent.photo}`} 
                  alt={`${Adherent.user.first_name} ${Adherent.user.last_name}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className={`absolute bottom-1 right-1 h-5 w-5 rounded-full ${Adherent.is_approved ? 'bg-green-500' : 'bg-amber-500'} border-2 border-white`}></div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {Adherent.user.first_name} {Adherent.user.last_name}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">Adhérent - Année universitaire 2024-2025</p>
                  <div className="mt-2 flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${Adherent.is_approved ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {Adherent.is_approved ? 'Approuvé' : 'En attente d\'approbation'}
                    </span>
                    <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{Adherent.filiere}</span>
                    <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">{Adherent.niveau}</span>
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Modifier le profil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Informations détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations personnelles */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Nom d'utilisateur</p>
                  <p className="mt-1 text-sm text-gray-900">{Adherent.user.first_name} {Adherent.user.last_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1 text-sm text-gray-900">{Adherent.user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Téléphone</p>
                  <p className="mt-1 text-sm text-gray-900">{Adherent.telephone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date d'adhésion</p>
                  <p className="mt-1 text-sm text-gray-900">{new Date(Adherent.date_adhesion).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Filière</p>
                  <p className="mt-1 text-sm text-gray-900">{Adherent.filiere}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Niveau</p>
                  <p className="mt-1 text-sm text-gray-900">{Adherent.niveau}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Statistiques */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-500">ID Adhérent</p>
                    <p className="text-sm font-semibold text-gray-900">#{Adherent.id}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-500">Adhésion </p>
                    <p className={`text-sm font-semibold ${Adherent.is_approved ? 'text-green-600' : 'text-amber-600'}`}>
                      {Adherent.is_approved ? 'Approuvée' : 'Non approuvée'}
                    </p>
                  </div>
                </div>


                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-500">Membre depuis</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {Math.floor((new Date() - new Date(Adherent.date_adhesion)) / (1000 * 60 * 60 * 24 * 30))} mois
                    </p>
                  </div>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      </main>
    </Content>
  </div>
);
}

export default Profil;
