import { useState, useContext } from 'react';
import { login as servicelogin } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password_user: ''
  });
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const response = await servicelogin(formData);
      setMessage({ type: 'success', text: 'Inicio de sesión exitoso' });
      login(response.data);
      setTimeout(() => {
        navigate(`/tasks/${response.data.user.id}`);
      }, 1000);
    } catch (error) {
      console.error(error.response?.data.message || 'Error de conexión');
      setMessage({ type: 'error', text: error.response?.data.message || 'Error de conexión' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-indigo-700 via-blue-500 to-purple-600 p-4">

      {/* Pantalla de carga */}
      {loading && (
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-lg">Verificando...</p>
        </div>
      )}
      <div className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl shadow-2xl w-full max-w-sm p-8 animate-fadeIn hover:scale-[1.02] transition-transform duration-300">

        {/* Logo y título */}
        <div className="flex flex-col items-center mb-6">
          <img src="./logo.png" alt="Logo" className="w-20 h-20 mb-2 drop-shadow-lg" />
          <h2 className="text-white font-bold text-2xl">Iniciar sesión</h2>
        </div>

        {/* Mensajes de error o éxito */}
        {message && (
          <div
            className={`mb-4 p-2 rounded text-center ${
              message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            {message.text}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="username"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            type="text"
            placeholder="Usuario"
          />
          <input
            name="password_user"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            type="password"
            placeholder="Contraseña"
          />
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform duration-200" type="submit">
            Iniciar sesión
          </button>
          <p className="text-white/80 text-center text-sm mt-2">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-blue-300 hover:underline">
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
