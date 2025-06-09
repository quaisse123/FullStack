import { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import Content from '../../components/Content';

function Annonces() {
    const [annonces, setAnnonces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const currentUser = 'monUsername'; // Remplace par le username réel

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

    const handleSend = () => {
        if (!newMessage.trim()) return;

        const payload = {
            titre: 'Annonce',
            contenu: newMessage.trim(),
        };
        fetch('http://localhost:8000/api/annonces/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
        .then(res => res.text())
        .then(text => {
                try {
                    const data = JSON.parse(text);
                    setAnnonces(prev => [...prev, data]);
                    setNewMessage('');
                    

                } catch (e) {
                    console.error('Erreur parsing JSON:', e);
                }
            })
            .catch(err => {
                console.error('Erreur envoi annonce:', err);
            });
        };
        
    return (
        <div className="flex h-screen">
            <Sidebar />
            <Content>
                <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen w-full">

                    <div className='mb-5'>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Boite Messagerie</h1>
                        <p className="text-sm text-gray-500">Année universitaire 2024-2025</p>
                    </div>        <div
                        className="flex flex-col flex-grow w-full max-w-full mx-auto border rounded shadow p-4 bg-white"
                        style={{ height: '80vh', overflowY: 'auto' }}
                    >
                        {loading ? (
                            <p className="text-blue-200">Chargement...</p>
                        ) : (
                            annonces.map((annonce) => {
                                const isCurrentUser = annonce.auteur?.username === currentUser;
                                return (
                                    <div
                                        key={annonce.id}
                                        className="w-full p-3 rounded-lg mb-4"
                                        style={{
                                            backgroundColor: isCurrentUser ? '#3b82f6' : '#e5e7eb',
                                            color: isCurrentUser ? 'white' : 'black',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        <p>{annonce.contenu}</p>
                                        <div className="text-xs mt-1" style={{ opacity: 0.7 }}>
                                            Par <span className="font-medium">{annonce.auteur?.username || 'Inconnu'}</span> le{' '}
                                            {new Date(annonce.date_creation).toLocaleString()}
                                        </div>
                                    </div>
                                );
                            })
                        )}

                        {/* Formulaire d'envoi */}
                        <div className="flex mt-auto">
                            <input
                                type="text"
                                placeholder="Écrire une annonce..."
                                className="flex-grow border rounded-l px-3 py-2 focus:outline-none"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                            >
                                Envoyer
                            </button>
                        </div>
                    </div>
                </main>
            </Content>
        </div>
    );
}

export default Annonces;
