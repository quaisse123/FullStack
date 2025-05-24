import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import Sidebar from '../../components/sidebar';
import Content from '../../components/Content';

const NIVEAUX = [
    { value: 'API1', label: 'API1' },
    { value: 'API2', label: 'API2' },
    { value: 'CI1', label: 'CI1' },
    { value: 'CI2', label: 'CI2' },
    { value: 'CI3', label: 'CI3' },
];

const FILIERES = [
    { value: 'IAGI', label: 'IAGI' },
    { value: 'CS2C', label: 'CS2C' },
    { value: 'GEM', label: 'GEM' },
    { value: 'MSEI', label: 'MSEI' },
    { value: 'GSMI', label: 'GSMI' },
    { value: 'GSI', label: 'GSI' },
];

export default function EditProfile() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        telephone: '',
        niveau: '',
        filiere: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        photo: null
    });
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Charger les données du profil
        const fetchProfileData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/profile/', {
                    credentials: 'include',
                });
                const data = await response.json();
                setFormData(prev => ({
                    ...prev,
                    username: data.username || '',
                    email: data.email || '',
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    telephone: data.telephone || '',
                    niveau: data.niveau || '',
                    filiere: data.filiere || '',
                }));
                if (data.photo) {
                    setPreviewImage(data.photo);
                }
            } catch (error) {
                console.error('Erreur lors du chargement du profil:', error);
            }
        };

        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo' && files[0]) {
            setFormData(prev => ({
                ...prev,
                photo: files[0]
            }));
            setPreviewImage(URL.createObjectURL(files[0]));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null) {
                    formDataToSend.append(key, formData[key]);
                }
            });

            const response = await fetch('http://localhost:8000/api/update-profile/', {
                method: 'POST',
                credentials: 'include',
                body: formDataToSend,
            });

            if (response.ok) {
                navigate('/membres/profil');
            } else {
                const error = await response.json();
                alert(error.message || 'Erreur lors de la mise à jour du profil');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil:', error);
            alert('Erreur lors de la mise à jour du profil');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex" }}>
            {loading && <Loading />}
            
            <Sidebar />
            
            <Content>
                <main className="flex-1 p-6 bg-gray-100">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                            Modifier le profil
                        </h1>

                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <form className="space-y-8" onSubmit={handleSubmit}>
                                {/* Section Photo de profil */}
                                <div className="flex items-center space-x-6">
                                    <div className="shrink-0">
                                        <img
                                            className="h-24 w-24 object-cover rounded-full"
                                            src={previewImage || 'http://localhost:8000/media/profile_photos/defaultProfile.png'}
                                            alt="Photo de profil"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Photo de profil
                                        </label>
                                        <div className="mt-1 flex items-center">
                                            <input
                                                type="file"
                                                name="photo"
                                                onChange={handleChange}
                                                className="block w-full text-sm text-gray-500
                                                         file:mr-4 file:py-2 file:px-4
                                                         file:rounded-full file:border-0
                                                         file:text-sm file:font-semibold
                                                         file:bg-indigo-50 file:text-indigo-700
                                                         hover:file:bg-indigo-100"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section Informations personnelles */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Prénom
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nom
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            name="telephone"
                                            value={formData.telephone}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Niveau
                                        </label>
                                        <select
                                            name="niveau"
                                            value={formData.niveau}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
                                        >
                                            <option value="">Sélectionner un niveau</option>
                                            {NIVEAUX.map(niveau => (
                                                <option key={niveau.value} value={niveau.value}>
                                                    {niveau.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Filière
                                        </label>
                                        <select
                                            name="filiere"
                                            value={formData.filiere}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
                                        >
                                            <option value="">Sélectionner une filière</option>
                                            {FILIERES.map(filiere => (
                                                <option key={filiere.value} value={filiere.value}>
                                                    {filiere.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Section Mot de passe */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Changer le mot de passe
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Mot de passe actuel
                                            </label>
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                value={formData.currentPassword}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-2.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nouveau mot de passe
                                            </label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-2.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Confirmer le nouveau mot de passe
                                            </label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-2.5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Boutons d'action */}
                                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/membres/profil')}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Mettre à jour
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </Content>
        </div>
    );
} 