import { useState, useEffect } from 'react';
import Sidebar from '../../components/Adherent/SidebarAdherent';
import Content from '../../components/Content';

function AdhAnnonces() {
    const [annonces, setAnnonces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/annonces/')
            .then(res => res.json())
            .then(data => {
                setAnnonces(data.reverse());
                setLoading(false);
            })
            .catch(err => {
                console.error('Erreur de chargement :', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <Content>
                <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen w-full">
                    <div className='mb-5'>
                        <h1 className="text-3xl font-bold text-blue-900">
                        Boite de messages 
                        </h1>
                        <p className="text-sm text-gray-500">Année universitaire 2024-2025</p>
                    </div>
                    <div
                        className="flex flex-col flex-grow w-full max-w-full mx-auto border rounded shadow p-4 bg-white"
                        style={{ height: '80vh', overflowY: 'auto' }}
                    >
                        {loading ? (
                            <p className="text-blue-200">Chargement...</p>
                        ) : (
                            annonces.map((annonce) => (
                                <div
                                    key={annonce.id}
                                    className="w-full p-3 rounded-lg mb-4"
                                    style={{
                                        backgroundColor: '#e5e7eb',
                                        color: 'black',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    <p>{annonce.contenu}</p>
                                    <div className="text-xs mt-1" style={{ opacity: 0.7 }}>
                                        Par <span className="font-medium">{annonce.auteur?.username || 'Inconnu'}</span> le{' '}
                                        {new Date(annonce.date_creation).toLocaleString()}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </main>
            </Content>
        </div>
    );
}

export default AdhAnnonces;
