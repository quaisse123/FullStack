import Header from '../components/Header' 
import Sidebar from '../components/sidebar' 
import Content from '../components/Content' 
import Cards from '../components/landingPage/Cards' 
import '../assets/styles/LandingPage.css'
import ProgressBars from '../components/landingPage/ProgressBars'
import Notifications from '../components/landingPage/Notifications'
import Events from '../components/landingPage/Events'
function LandingPage() {
    return (
        <div style={{display : "flex"}}>
        <Sidebar />
          <Content>
            <main className="flex-1 p-6 bg-gray-100">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Info Cards */}
                  <Cards />

                  {/* Progress Bars */}
                  <ProgressBars />
                  

                  {/* Notifications Section */}
                  <Notifications/>

                  {/* Creative Idea: Upcoming Events */}
                  <Events/>
                  
                </div>
            </main>
          </Content>
        </div>
    );
}

export default LandingPage;
