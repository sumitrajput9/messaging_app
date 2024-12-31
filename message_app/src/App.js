import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Login from './Component/Pages/Login';
import { Register } from './Component/Pages/Register';
import { SidebarComponents } from './Component/SideBar/SidebarComponents';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="/register" element={<Register/>}/>
            <Route path='/home/*' element={<SidebarComponents/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
