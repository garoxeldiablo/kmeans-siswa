import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PrivateRoute from "./utility/privateroute"
import { Provider } from "react-redux"
import {store, persistor} from "./utility/store"
import { PersistGate } from "redux-persist/integration/react"

import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import Signin from "./pages/SignIn"
import Sidenav from "./components/Sidenav"
import Field from "./pages/Field"
import Dataset from "./pages/Data-set"
import PersiapanData from "./pages/Data-persiapan"
import InputData from "./pages/Input-Data"
import Datareview from "./pages/Data-review"
import Perhitungan from "./pages/Perhitungan"
import PerhitunganMetode from "./pages/Perhitungan-Metode"
import HasilPerhitungan from "./pages/Hasil-Perhitungan"
import UserManagement from "./pages/User-management"

function App() {

  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Sidenav/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            {/* <Route path="/unauthorized" element={<UnauthorizedPage/>} /> */}
            <Route path="/signin" element={<Signin/>}/>

            <Route path="/dashboard" element={
              <PrivateRoute requiredRole={["Super Admin", "Staff TU"]}>
                <Dashboard />
              </PrivateRoute>
            }/>

            <Route path="/field" element={
              <PrivateRoute requiredRole={["Super Admin", "Staff TU"]}>
                <Field />
              </PrivateRoute>
            }/>

            <Route path="/dataset" element={
              <PrivateRoute requiredRole={["Super Admin" , "Staff TU"]}>
                <Dataset />
              </PrivateRoute>
            }/>

            <Route path="/persiapandata" element={
              <PrivateRoute requiredRole={["Super Admin", "Staff TU"]}>
                <PersiapanData />
              </PrivateRoute>
            }/>

            <Route path="/persiapandata/input/:siswa_id" element={
              <PrivateRoute requiredRole={["Super Admin" , "Staff TU"]}>
                <InputData />
              </PrivateRoute>
            }/>

            <Route path="/persiapandata/review" element={
              <PrivateRoute requiredRole={["Super Admin" , "Staff TU"]}>
                <Datareview />
              </PrivateRoute>
            }/>

            <Route path="/perhitungan" element={
              <PrivateRoute requiredRole={["Super Admin" , "Staff TU"]}>
                <Perhitungan />
              </PrivateRoute>
            }/>

            <Route path="/perhitungan/kmeans" element={
              <PrivateRoute requiredRole={["Super Admin" , "Staff TU"]}>
                <PerhitunganMetode />
              </PrivateRoute>
            }/>

            {/* 

            <Route path="/perhitungan/metode/hasil" element={
              <PrivateRoute requiredRole={["Super Admin" , "Koor. Personal Trainer"]}>
                <HasilPerhitungan />
              </PrivateRoute>
            }/>

            <Route path="/user" element={
              <PrivateRoute requiredRole="Super Admin">
                <UserManagement />
              </PrivateRoute>
            }/> 
            */}
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
    </>
  )
}

export default App
