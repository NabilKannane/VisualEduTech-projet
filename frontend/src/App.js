import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Upload, Login, Register, Results} from "./pages";

import "./App.css";
import DashboardWraper from "./components/DashboardWraper";
import PrivateRoute from "./contexts/PrivateRoute";
import PageNotFound from "./contexts/PageNotFound";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  

  return (
    <div>
      <BrowserRouter>
              <Routes>
                <Route path="/" element={<DashboardWraper/>}>
                  <Route index={true} path="/" element={<Navigate to="/dashboard"/>} />
                  <Route path="/dashboard" element={<PrivateRoute Component={Dashboard}/>} />
                  <Route path="/upload" element={<PrivateRoute Component={Upload}/>} />
                  <Route path="/results" element={<PrivateRoute Component={Results}/>} />
                </Route>
                {/* dashboard  */}

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
      </BrowserRouter>

      
<ToastContainer/>
    </div>
  );
};

export default App;
