import Header from '../components/Header' 
import '../assets/styles/Dashboard.css'
// Commun components
import Sidebar from '../components/sidebar' 
import Content from '../components/Content'
// Dashboard components
import Cards from '../components/dashboard/Cards' 
import ProgressBars from '../components/dashboard/ProgressBars'
import Notifications from '../components/dashboard/Notifications'
import Events from '../components/dashboard/Events'
// ===============================================================

function LandingPage() {
    return (
        <div style={{display : "flex"}}>
        <Sidebar />

          <Content>
            <main className="flex-1 p-6 bg-gray-100">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <div className="grid grid-cols-1 mt-6 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
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
