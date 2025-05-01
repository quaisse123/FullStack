import { useState } from "react";

import '../assets/styles/sidebar.css'
import brandimage from '../assets/images/brand.png'
import Loading from '../components/Loading'
import { useEffect } from "react";
function Sidebar() {
      // Menu 1
      const [menu1Ouvert, ChangerEtat1] = useState(false); // état du menu
      const toggleMenu1 = () => {
          ChangerEtat1(!menu1Ouvert); // Bascule l'état du menu
      }
      
      // Menu 2
      const [menu2Ouvert , ChangerEtat2] = useState(false);
      const toggleMenu2 = () => {
        ChangerEtat2 (!menu2Ouvert);
      }



      const [userData, setUserData] = useState(null);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:8000/dashboard/', {
                credentials: 'include',
              });
      
              const data = await response.json();
              setUserData(data); // Set user data to state
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
        }, []);

    if (!userData) {
      return <Loading />;
    }
    return (
        <aside  className="bg-gray-900 text-white">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-1 ">
          <img src={ brandimage } alt="Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold">Trendify</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-gray-800 text-white rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search..."
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <nav className="mt-0 px-2">
        {/* Main Navigation */}
        <div className="space-y-4">
          {/* Dashboard */}
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-800 text-white group transition-all duration-200 hover:bg-gray-700">
            <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </a>

          

          {/* Analytics Dropdown */}
          <div className="space-y-1">
            <button onClick={toggleMenu1} id="menu1" className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none" aria-expanded={menu1Ouvert} aria-controls="analytics-dropdown">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analytics
              </div>
              <svg className="ml-2 h-5 w-5 transform transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="space-y-1 pl-11"
                 id="analytics-dropdown"
                 style={{display : menu1Ouvert ? "block" : "none" }}
                 >
              <a href="#" className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                Overview
              </a>
              <a href="#" className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                Reports
              </a>
              <a href="#" className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                Statistics
              </a>
            </div>
          </div>

          {/* Team Dropdown */}
          <div className="space-y-1">
            <button onClick={toggleMenu2} className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none" aria-expanded="false" aria-controls="team-dropdown">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Team
              </div>
              <svg className="ml-2 h-5 w-5 transform transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div style={{ display : menu2Ouvert ? "block" : "none" }} className="hidden space-y-1 pl-11" id="team-dropdown">
              <a href="#" className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                Members
              </a>
              <a href="#" className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                Calendar
              </a>
              <a href="#" className="group flex items-center px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                Settings
              </a>
            </div>
          </div>

          {/* Projects */}
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
            <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            Projects
          </a>

          {/* Calendar */}
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
            <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Calendar
          </a>

          {/* Documents */}
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200">
            <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Documents
          </a>
        </div>
      </nav>

      {/* User Profile */}
      <div id="profile" className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <img className="h-8 w-8 rounded-full" src={"http://localhost:8000" + userData.photo_url} alt="aa" />
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{ userData.first_name } { userData.last_name }</p>
            <p className="text-xs text-gray-400">{ userData.email }</p>
          </div>
        </div>
      </div>
      </aside>
      
    );
}

export default Sidebar;
