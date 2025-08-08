
import { useState } from 'react';
import { register as serviceregister } from '../services/authService';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password_user: ''
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await serviceregister(formData);
            alert('Usuario registrado correctamente');
            navigate('/login');
        } catch (error) {
            console.error(error.response?.data.message || 'Error al registrar usuario');
        }
    };
    return (
        <section className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-indigo-700 via-blue-500 to-purple-600 p-4">
            <div className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl shadow-2xl w-full max-w-sm p-8 animate-fadeIn hover:scale-[1.02] transition-transform duration-300">
                <div className="flex flex-col items-center mb-6">
                    <img src="./logo.png" alt="Logo" className="w-20 h-20 mb-2 drop-shadow-lg" />
                    <h2 className="text-white font-bold text-2xl">Registrarse</h2>
                </div>
                <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        name="username"
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        type="text"
                        placeholder="Usuario" />
                    <input
                        name="password_user"
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        type="text"
                        placeholder="Contraseña" />
                    <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform duration-200" type="submit">Registrar</button>
                    <p className="text-white/80 text-center text-sm mt-2">
                        ¿Ya tienes una cuenta?{' '}
                        <a href="/" className="text-blue-300 hover:underline">
                            Inicia sesión
                        </a>
                    </p>                </form>
            </div>
        </section>
    );
}
export default Login;