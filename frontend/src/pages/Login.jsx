import { useState } from 'react';
import brandimage from '../assets/images/brand.png'
export default function LoginPage() {
  const [matricule, setMatricule] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [messages, setMessages] = useState([]); // ex: [{ type: 'success', text: 'Connexion réussie' }]

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: envoyer matricule/password vers votre API ici
    console.log({ matricule, password, rememberMe });
  };

  return (
    <>
  {/* Navbar */}
  <nav className="bg-gray-900 border-b border-gray-800 fixed top-0 w-full z-50">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse" id="brand">
        <img src={brandimage} className="h-10" alt="Trendify Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Trendify</span>
      </a>

      <div className="flex items-center space-x-3 md:order-2 rtl:space-x-reverse">
        <button id="contactus" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition">
          Contactez-nous
        </button>

        {/* Menu Burger Mobile */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none"
          aria-controls="navbar-user"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>
    </div>
  </nav>

  {/* Contenu principal */}
  <div className="flex flex-col md:flex-row min-h-screen pt-20 bg-gray-900">
    
    {/* Partie gauche */}
    <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-800 p-8">
      <div className="flex items-center w-full space-x-4 mb-6">
        <img src={brandimage} width="60" alt="Trendify Logo" />
        <div className="text-3xl font-bold text-white">Trendify</div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-left text-white">
        Gérez vos clubs universitaires avec facilité
      </h1>

      <p className="text-gray-400 text-left mb-6">
        Centralisez, suivez et organisez les activités, événements et membres de vos clubs.
        Pensé pour les universités modernes et les associations étudiantes dynamiques.
      </p>

      <span className="text-blue-400 font-medium">
        Plus de 100 000 étudiants utilisent Trendify
      </span>
    </div>

    {/* Partie droite - Formulaire login */}
    <div className="w-full md:w-1/2 flex items-center justify-center p-8">
      <div className="w-full bg-gray-800 rounded-lg shadow-md dark:border dark:border-gray-700 sm:max-w-md p-6 space-y-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
          Se connecter
        </h1>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="matricule" className="block mb-2 text-sm font-medium text-gray-300">
              Matricule
            </label>
            <input
              type="text"
              id="matricule"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              placeholder="Entrez votre matricule"
              required
              className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 border-gray-600 bg-gray-700 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                Se souvenir de moi
              </label>
            </div>
            <a href="#" className="text-sm text-blue-400 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 transition focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Se connecter
          </button>

          <p className="text-sm font-light text-gray-400 text-center">
            Pas encore inscrit ?{' '}
            <a href="#" className="font-medium text-blue-400 hover:underline">
              Créer un compte
            </a>
          </p>
        </form>

        {/* Messages */}
        {messages.length > 0 && (
          <div className="flex flex-col space-y-4 mt-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex items-center p-4 mb-4 text-sm border rounded-lg mx-auto w-4/5 ${
                  message.type === 'error'
                    ? 'text-red-400 bg-gray-800 border-red-600'
                    : message.type === 'success'
                    ? 'text-green-400 bg-gray-800 border-green-600'
                    : message.type === 'warning'
                    ? 'text-yellow-400 bg-gray-800 border-yellow-600'
                    : 'text-blue-400 bg-gray-800 border-blue-600'
                }`}
                role="alert"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.5 9.5 0 0 0 10 .5ZM9 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm1 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                </svg>
                <div>{message.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
</>

  );
}
