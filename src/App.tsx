import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Login from '@/pages/auth/Login.tsx';
import Register from '@/pages/auth/Register.tsx';
import Layout from '@/pages/Layout.tsx';
import Dashboard from '@/pages/storage/Dashboard.tsx';
import Files from '@/pages/storage/Files.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Layout/>}>
          {["", "*"].map((path, index) => (
            <Route key={index} path={path} element={
              <Navigate to="/dashboard" replace/>
            }/>
          ))}
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/files' element={<Files/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
