import './App.css';
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext'; // ✅ importar AuthProvider
import { useContext } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/tasks';

const PrivateRoutes = ({ children }) => {
  const { auth } = useContext(AuthContext);
  return auth ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider> 
      <HashRouter >      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks/:userId" element={<PrivateRoutes><Tasks /></PrivateRoutes>} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
