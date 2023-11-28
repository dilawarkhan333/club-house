import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Login from './components/Login';
import Errror from './components/Errror';
import { Routes, Route } from "react-router-dom"
import Forget from './components/forgetpasaword';
import Signup from './components/signup';
import Dashboard from './Dashboard';
import Createuser from './components/Createuser';
import Paymentcard from './components/Paymentcard';
import Success from './components/Success';
import Cancel from './components/Cancel';


function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Errror />} />
        <Route path='/forget' element={<Forget />} />
        <Route path='/createuser' element={<Createuser />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='payment' element={<Paymentcard />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </>
  );
}

export default App;