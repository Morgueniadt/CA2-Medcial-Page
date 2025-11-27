import { useState, useEffect} from 'react';
 
import { BrowserRouter as Router, Routes, Route } from "react-router";
 
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
 
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
 
import AppointmentsIndex from '@/pages/appointments/Index';
import AppointmentsShow from '@/pages/appointments/Show';
import AppointmentsCreate from '@/pages/appointments/Create';
import AppointmentsEdit from '@/pages/appointments/Edit';

import DoctorsIndex from '@/pages/doctors/Index';
import DoctorsShow from '@/pages/doctors/Show';
import DoctorsCreate from '@/pages/doctors/Create';
import DoctorsEdit from '@/pages/doctors/Edit';
 
import DiagnosisIndex from '@/pages/diagnosis/Index';
import DiagnosisShow from '@/pages/diagnosis/Show';
import DiagnosisCreate from '@/pages/diagnosis/Create';
import DiagnosisEdit from '@/pages/diagnosis/Edit';

import PatientsIndex from '@/pages/patients/Index';
import PatientsShow from '@/pages/patients/Show';
import PatientsCreate from '@/pages/patients/Create';
import PatientsEdit from '@/pages/patients/Edit';

import PerscriptionsIndex from '@/pages/perscriptions/Index';
import PerscriptionsShow from '@/pages/perscriptions/Show';
import PerscriptionsCreate from '@/pages/perscriptions/Create';
import PerscriptionsEdit from '@/pages/perscriptions/Edit';
 
 
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
 
  useEffect(() => {
    let token = localStorage.getItem("token");
 
    if(token){
      setLoggedIn(true);
    }
 
  }, []);
 
  const onLogin = (auth, token) => {
    setLoggedIn(auth);
 
    if(auth){
      localStorage.setItem('token', token)
    }
    else {
      localStorage.removeItem('token');
    }
  };
 
  // return (
  //   <>
  //     <Router>
  //       <Navbar onLogin={onLogin} loggedIn={loggedIn} />
  //       <Routes>
  //         <Route path='/' element={<Home onLogin={onLogin} loggedIn={loggedIn} />} />
 
  //         <Route path="/doctors" element={<FestivalsIndex />} />
  //         <Route path="/doctors/:id" element={<FestivalsShow loggedIn={loggedIn} />} />
 
  //       </Routes>
  //     </Router>
  //   </>
  // )
 
  return (
    <Router>
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
      >
        <AppSidebar variant="inset" loggedIn={loggedIn} onLogin={onLogin} />
        <SidebarInset>
          <SiteHeader />
          {/* <Navbar onLogin={onLogin} loggedIn={loggedIn} /> */}
 
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 mx-6">
                {/* Main content */}
                <Routes>
                  <Route
                    path="/"
                    element={<Home onLogin={onLogin} loggedIn={loggedIn} />}
                  />
                  // Doctors Routes
                  <Route path="/doctors" element={<DoctorsIndex />} />
                  <Route
                    path="/doctors/:id"
                    element={<DoctorsShow loggedIn={loggedIn} />}
                  />
                  <Route
                    path="/doctors/:id/edit"
                    element={<DoctorsEdit />}
                  />
                  <Route path="/doctors/create" element={<DoctorsCreate />} />
                 
                  // Patients Routes
                  <Route path="/patients" element={<PatientsIndex />} />
                  <Route
                    path="/patients/:id"
                    element={<PatientsShow loggedIn={loggedIn} />}
                  />
                  <Route
                    path="/patients/:id/edit"
                    element={<PatientsEdit />}
                  />
                  <Route path="/patients/create" element={<PatientsCreate />} />
                  // Appointments Routes
                  <Route path="/appointments" element={<AppointmentsIndex />} />
                  <Route
                    path="/appointments/:id"
                    element={<AppointmentsShow loggedIn={loggedIn} />}
                  />
                  <Route
                    path="/appointments/:id/edit"
                    element={<AppointmentsEdit />}
                  />
                  <Route path="/appointments/create" element={<AppointmentsCreate />} />
                  // Perscriptions Routes
                  <Route path="/perscriptions" element={<PerscriptionsIndex />} />
                  <Route
                    path="/perscriptions/:id"
                    element={<PerscriptionsShow loggedIn={loggedIn} />}
                  />
                  <Route
                    path="/perscriptions/:id/edit"
                    element={<PerscriptionsEdit />}
                  />
                  <Route path="/perscriptions/create" element={<PerscriptionsCreate />} />  
                  // diagnoses Routes
                  <Route path="/diagnosis" element={<DiagnosisIndex />} />
                  <Route
                    path="/diagnosis/:id"
                    element={<DiagnosisShow loggedIn={loggedIn} />}
                  />
                  <Route
                    path="/diagnosis/:id/edit"
                    element={<DiagnosisEdit />}
                  />
                  <Route path="/diagnosis/create" element={<DiagnosisCreate />} />
                </Routes>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Router>
  );
}