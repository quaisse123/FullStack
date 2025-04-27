// src/pages/ArticlesPage.jsx
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import { motion } from 'framer-motion';
function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Log pour vérifier que le composant est bien monté et qu'on lance la récupération des articles
    console.log("Fetching articles...");
    
    fetch('http://127.0.0.1:8000/api/articles/')
      .then((response) => response.json())
      .then((data) => {
        console.log('Données récupérées:', data);  // Log pour voir les données
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des articles:', error);
        setError('Impossible de récupérer les articles');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header />
      <Sidebar />
      <Content>
        <h2>Liste des Articles</h2>
        <ul>
          {articles.length > 0 ? (
            articles.map((article) => (
              <li key={article.id}>{article.title}</li>  // Affiche le titre de chaque article
            ))
          ) : (
            <li>Aucun article trouvé</li>
          )}
        </ul>
      </Content>
    </div>
  );
}

export default ArticlesPage;
