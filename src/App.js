import './App.css';
import SignUp from './SignUp';
import { Routes, Route, Navigate } from "react-router-dom";
import Signin from './Signin';
import Dashboard from './Dashboard';
import Edit from './Edit';

function App() {
  return (
    <>
    <Routes>
      <Route path= '/' element={<SignUp />} />
      <Route path= '/login' element={<Signin/>} />
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/edit/' element={<Edit/>}/>
    </Routes>

    </>
  );
}

export default App;
