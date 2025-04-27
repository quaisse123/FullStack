import Header from '../components/Header' 
import Sidebar from '../components/Sidebar' 
import Content from '../components/Content' 

function LandingPage() {
    return (
      <div>
        <Header />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <Content>
            <h2 className="text-red-500">Bienvenue sur notre site !</h2>
            <p>C'est la page d'accueil.</p>
          </Content>
        </div>
      </div>
    );
}

export default LandingPage;
