import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Login from './components/Login';
import Errror from './components/Errror';
import {Routes,Route} from "react-router-dom"
import Forget from './components/forgetpasaword';
import Signup from './components/signup';
import Dashboard from './Dashboard';


function App() {
  return (
  <>
 
    <Routes>
      <Route path='/' element={<Signup/>} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<Errror />} />
      <Route path='/forget' element={<Forget />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  </>
  );
}

export default App;