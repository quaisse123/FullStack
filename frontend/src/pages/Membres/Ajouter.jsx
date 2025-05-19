import { useState } from 'react';
import Sidebar from '../../components/sidebar';
import Content from '../../components/Content';
import Loading from '../../components/Loading';
import SuccessAlert from '../../components/Success'
import ErrorAlert from '../../components/Error';
function AjouterAdherent() {
  const [loading, setLoading] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [ShowError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    niveau: '',
    filiere: '',
    telephone: '',
    date_adhesion: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:8000/Apimembres/ajouter', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setSuccess(true);
        e.target.reset();
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          niveau: '',
          filiere: '',
          telephone: '',
          date_adhesion: '',
          photo: null,
        });
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error('Erreur de réseau :', error);
      alert('Erreur réseau');
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {loading && <Loading />}
      
      <Sidebar />
      <Content>
        {Success && <SuccessAlert SetSuccess={setSuccess} />} 
        {ShowError && <ErrorAlert setShowError={setShowError} />}
        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Ajouter un adhérent</h1>
            <p className="text-gray-500 mt-1">Remplissez les informations ci-dessous pour ajouter un nouvel adhérent.</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl mx-auto space-y-6 border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="bg-blue-100 mt-1 block w-full p-2 rounded-lg border-gray-300 shadow-sm"
                  placeholder="Nom"
                />
              </div>

              {/* Prénom */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="bg-blue-100 mt-1 block w-full p-2 rounded-lg border-gray-300 shadow-sm"
                  placeholder="Prénom"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-blue-100 mt-1 block w-full p-2 rounded-lg border-gray-300 shadow-sm"
                  placeholder="exemple@mail.com"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                <input
                  type="text"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="bg-blue-100 mt-1 block w-full p-2 rounded-lg border-gray-300 shadow-sm"
                  placeholder="06XXXXXXXX"
                />
              </div>

              {/* Niveau */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Niveau</label>
                <select
                  name="niveau"
                  value={formData.niveau}
                  onChange={handleChange}
                  className="bg-blue-100 mt-1 block w-full p-2 rounded-lg border-gray-300 shadow-sm"
                >
                  <option value="">Sélectionner</option>
                  <option value="API1">API1</option>
                  <option value="API2">API2</option>
                  <option value="CI1">CI1</option>
                  <option value="CI2">CI2</option>
                  <option value="CI3">CI3</option>
                </select>
              </div>

              {/* Filière */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Filière</label>
                <select
                  name="filiere"
                  value={formData.filiere}
                  onChange={handleChange}
                  className="bg-blue-100 mt-1 block w-full p-2 rounded-lg border-gray-300 shadow-sm"
                >
                  <option value="">Sélectionner</option>
                  <option value="IAGI">IAGI</option>
                  <option value="CS2C">CS2C</option>
                  <option value="GEM">GEM</option>
                  <option value="MSEI">MSEI</option>
                  <option value="GSMI">GSMI</option>
                  <option value="GSI">GSI</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Date d’adhésion</label>
                <input
                  type="date"
                  name="date_adhesion"
                  value={formData.date_adhesion}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                />
              </div>

              {/* Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Photo de profil</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  accept="image/*"
                  className="mt-1 block w-full p-2 text-sm text-gray-700"
                />
              </div>
            </div>

            <div className="text-right pt-4">
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700"
              >
                Enregistrer l’adhérent
              </button>
            </div>
          </form>
        </main>
      </Content>
    </div>
  );
}

export default AjouterAdherent;
