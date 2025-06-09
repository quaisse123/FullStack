import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import Sidebar from '../../components/sidebar';
import Content from '../../components/Content';

const NIVEAUX = ['API1', 'API2', 'CI1', 'CI2', 'CI3'];
const FILIERES = ['IAGI', 'CS2C', 'GEM', 'MSEI', 'GSMI', 'GSI'];

export default function EditProfile() {
    const { id } = useParams();
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
        photo: null,
    });
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("ID reçu par useParams():", id);
        const fetchProfileData = async () => {
    setLoading(true);
    try {
        const response = await fetch(`http://localhost:8000/auth/profile/${id}/`, {
            credentials: 'include',
        });
        if (!response.ok) throw new Error("Erreur lors du chargement du profil");
        const data = await response.json();

        console.log("Données reçues :", data);

        // Vérifie que la liste n’est pas vide
        if (data.length > 0) {
            const userData = data[0];
            const user = userData.user;

            setFormData(prev => ({
                ...prev,
                username: user.username || '',
                email: user.email || '',
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                telephone: userData.telephone || '',
                niveau: userData.niveau || '',
                filiere: userData.filiere || '',
            }));

            if (userData.photo) {
                setPreviewImage(`http://localhost:8000${userData.photo}`);
            }
        } else {
            console.warn("Aucun utilisateur trouvé avec cet ID.");
        }

    } catch (error) {
        console.error("Erreur lors du chargement :", error);
    } finally {
        setLoading(false);
    }
};


        if (id) fetchProfileData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo' && files?.[0]) {
            setFormData(prev => ({ ...prev, photo: files[0] }));
            setPreviewImage(URL.createObjectURL(files[0]));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
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

            const response = await fetch(`http://localhost:8000/auth/profile/${id}/`, {
                method: 'POST',
                credentials: 'include',
                body: formDataToSend,
            });

            if (response.ok) {
                navigate('/membres/profil');
            } else {
                const error = await response.json();
                alert(error.message || 'Erreur lors de la mise à jour');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour :', error);
            alert('Erreur de mise à jour');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex">
            {loading && <Loading />}
            <Sidebar />
            <Content>
                <main className="flex-1 p-6 bg-gray-100">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-2xl font-semibold mb-6 text-gray-900">
                            Modifier le profil
                        </h1>

                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="flex items-center space-x-6">
                                    <div className="shrink-0">
                                        <img
                                            className="h-24 w-24 object-cover rounded-full"
                                            src={
                                                previewImage ||
                                                'http://localhost:8000/media/profile_photos/defaultProfile.png'
                                            }
                                            alt="Photo de profil"
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 text-2xl font-semibold text-gray-900">
                                            {formData.first_name} {formData.last_name}
                                        </div>
                                        <label className="block text-sm font-medium text-gray-700"></label>
                                        <input
                                            type="file"
                                            name="photo"
                                            onChange={handleChange}
                                            className="mt-2 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { name: 'first_name', label: 'Prénom' },
                                        { name: 'last_name', label: 'Nom' },
                                        { name: 'email', label: 'Email', type: 'email' },
                                        { name: 'telephone', label: 'Téléphone', type: 'tel' },
                                    ].map(({ name, label, type = 'text' }) => (
                                        <div key={name}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                            <input
                                                type={type}
                                                name={name}
                                                value={formData[name]}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                                            />
                                        </div>
                                    ))}

                                    {/* Select Niveau */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                                        <select
                                            name="niveau"
                                            value={formData.niveau}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                                        >
                                            <option value="">Sélectionner un niveau</option>
                                            {NIVEAUX.map(niv => (
                                                <option key={niv} value={niv}>{niv}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Select Filière */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Filière</label>
                                        <select
                                            name="filiere"
                                            value={formData.filiere}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                                        >
                                            <option value="">Sélectionner une filière</option>
                                            {FILIERES.map(fil => (
                                                <option key={fil} value={fil}>{fil}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                
                                {/* Actions */}
                                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/membres/liste')}
                                        className="px-4 py-2 bg-white text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
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
