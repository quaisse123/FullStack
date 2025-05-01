import { useState } from 'react';
import brandimage from '../assets/images/brand.png'
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    // Création des états pour stocker les valeurs du formulaire
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); //pour la redirection 


    const handleSubmit = async (e) => {
      e.preventDefault(); // Empêche le rechargement de la page
    
      try {
        const response = await fetch('http://localhost:8000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // 🔒 important pour la session Django
          body: JSON.stringify({ email, password }),
        });
    
        const data = await response.json();
    
        if (data.success) {
          const test = await fetch('http://localhost:8000/dashboard/', {
            credentials: 'include',
          });
        
          const info = await test.json();
          console.log(info); // vérifie si l'utilisateur est reconnu
        
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Erreur lors de la connexion', error);
        alert('Erreur serveur');
      }
    };
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-gray-800 space-y-6">
        {/* Logo + Title */}
        <div className="flex items-center justify-center gap-2">
          <img
            src={ brandimage } // remplace par ton logo réel
            alt="Trendify"
            className="h-10 w-10"
          />
          <h1 className="text-2xl font-bold">Trendify</h1>
        </div>

        {/* Heading */}
        <div>
          <h2 className="text-center text-xl font-semibold">Sign in to your account</h2>
          <p className="text-center text-sm text-gray-400">
            Welcome back! Please enter your credentials.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email address
            </label>
            <div className="relative text-s">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m8-4H8m-2 8h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                type="email"
                id="email"
                name='email'
                onChange={(e)=>setEmail(e.target.value)}  
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
                // autoComplete='off'
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c.554 0 1-.672 1-1.5S12.554 8 12 8s-1 .672-1 1.5.446 1.5 1 1.5zM6 21h12a2 2 0 002-2V8a2 2 0 00-2-2h-1V4a2 2 0 00-4 0v2H9V4a2 2 0 00-4 0v2H4a2 2 0 00-2 2v11a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                type="password"
                id="password"
                name='password'
                onChange={(e)=>setPassword(e.target.value)}  
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox bg-gray-700 text-indigo-500 rounded" />
              Remember me
            </label>
            <a href="#" className="text-indigo-400 hover:underline">Forgot password?</a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>

        
      </div>
    </div>
  );
}
