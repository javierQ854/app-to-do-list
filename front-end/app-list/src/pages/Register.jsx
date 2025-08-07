
import { useState } from 'react';
import { register as serviceregister } from '../services/authService';
import {useNavigate} from 'react-router-dom'; 
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
        <section className="h-screen w-screen  flex justify-center items-center">
            <div className="flex flex-col gap-5">
                <h2 className=" font-bold text-base md:text-3xl text-center"> Registrar</h2>
                <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input name="username" onChange={handleChange} className="border border-gray-300 py-2 rounded px-3" type="text" placeholder="Usuario" />
                    <input name="password" onChange={handleChange} className="border border-gray-300 py-2 rounded px-3" type="text" placeholder="Contraseña"/>
                    <button className="font-bold bg-blue-500 cursor-pointer hover:bg-blue-400 text-white py-2 rounded" type="submit">Iniciar sesion</button>
                </form>
            </div>
        </section>
    );
}
export default Login;