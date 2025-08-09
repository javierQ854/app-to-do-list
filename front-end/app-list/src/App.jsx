import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
    <AuthProvider> {/* ✅ Aquí envuelves toda tu app */}
      <BrowserRouter basename='/app-to-do-list/'> {/* Asegúrate de que el basename sea correcto */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks/:userId" element={<PrivateRoutes><Tasks /></PrivateRoutes>} /> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
