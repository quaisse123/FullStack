// src/components/Header.jsx
import '../assets/styles/header.css'
function Header() {
    return (
      <header className=" text-white  "
       style={{ position : 'fixed',
      width : '100%', zIndex: 1000,
      visibility :'hidden'
      }}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-5 lg:px-2 sm:px-4" aria-label="Global">
          <div className="flex lg:flex-1 items-center gap-3 ">
            <a href="#" className="-m-1.5 p-1.5">
              <img className="h-8 w-auto" src="https://img.icons8.com/m_rounded/512/FFFFFF/tailwind_css.png" alt=""></img>
            </a>
            <div className="text-2xl font-bold" >Website</div>
          </div>
          
          
          <button id='SeConnecter' >
            Se connecter
          </button>
        </nav>

        
      </header>
    );
  }
  
  export default Header;
  