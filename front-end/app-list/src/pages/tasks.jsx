import React, { useCallback, useEffect, useState } from 'react';
import { createTask as createTaskService, getTasks, deleteTask, updateTask } from '../services/taskService';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [edit, setEdit] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [form, setForm] = useState({
        title: "",
        description: "",
        userId: userId || ''
    });

    // Detecta si es móvil o no, y actualiza al cambiar el tamaño
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchTasks = useCallback(async () => {
        try {
            const response = await getTasks(userId);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }, [userId]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (edit) {
                await updateTask(edit.id, form);
                alert('Tarea actualizada exitosamente');
            } else {
                await createTaskService(form);
                alert('Tarea creada exitosamente');
                setModalOpen(false);
            }
            setForm({ title: '', description: '', userId });
            setEdit(null);
            fetchTasks();
        } catch (error) {
            console.error('Error al crear o actualizar la tarea:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Eliminar esta tarea?')) return;
        await deleteTask(id);
        fetchTasks();
    };

    const handleEdit = (task) => {
        setForm({
            title: task.title,
            description: task.description,
            userId
        });
        setEdit(task);
        if (isMobile) setModalOpen(true); // en móvil abre modal
    };
    const exit = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <section className="min-h-screen w-full flex flex-col gap-4 items-center bg-gradient-to-br from-indigo-700 via-blue-500 to-purple-600 ">
            <div className='min-w-screen flex p-2 items-center justify-between'>
                <h1 className="text-3xl md:min-w-screen md:text-center font-bold text-white ">Tareas</h1>
                <div className='p-2 md:hidden flex gap-2'>
                    <button onClick={() => setModalOpen(true)}>
                        <iconify-icon className="cursor-pointer" title="Agregar tarea" icon="gg:add" width="24" height="24"></iconify-icon>
                    </button>
                    <iconify-icon onClick={exit} className="cursor-pointer" title="Cerrar sesión" icon="mdi:logout" width="24" height="24"></iconify-icon>
                </div>
            </div>

            {(isMobile ? modalOpen : true) && (
                <div
                    className={`
                        ${isMobile ? 'fixed inset-0 flex items-center justify-center bg-black/50 z-50' : 'md:static md:bg-transparent md:flex md:justify-start md:items-start'}
                    `}
                >
                    {isMobile && (
                        <div
                            className="absolute inset-0 z-40"
                            onClick={() => setModalOpen(false)}
                        />
                    )}

                    <form onSubmit={handleSubmit} className={`md:flex  md:flex-row md:justify-center md:items-start
                            relative z-50 flex flex-col gap-4 p-5 rounded-md
                            bg-gray-800 backdrop-blur-sm
                            w-[80%] max-w-sm h-fit
                            ${!isMobile ? 'bg-transparent backdrop-blur-none p-0 w-full max-w-none' : ''}
                        `}
                    >
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="border border-gray-300 py-2 rounded text-white px-3"
                            placeholder="Nueva tarea"
                        />
                        <input
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="border border-gray-300 py-2 rounded text-white px-3"
                            placeholder="Descripción"
                        />

                        <div className="flex gap-2">
                            <button
                                className="font-bold bg-blue-500 px-3 cursor-pointer hover:bg-blue-400 text-white py-2 rounded"
                                type="submit"
                            >
                                {edit ? 'Actualizar' : 'Agregar'}
                            </button>
                            {isMobile && (
                                <button
                                    type="button"
                                    className="font-bold bg-blue-500 px-3 cursor-pointer hover:bg-blue-400 text-white py-2 rounded"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}

            <div>
                <ul className='max-w-5xl mx-auto flex flex-col px-3 w-screen gap-2'>
                    {tasks.map(task => (
                        <li key={task.id} className=" md:flex-row md:justify-between backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl shadow-2xl p-4 flex flex-col gap-2 hover:scale-[1.02] transition-transform duration-300">
                            <div>
                                <h2 className="font-bold uppercase">{task.title}</h2>
                                <p>{task.description}</p>
                            </div>

                            <div className='flex pt-2 items-center justify-center '>
                                <button onClick={() => handleDelete(task.id)} className="bg-red-500 text-white flex items-center justify-center p-1 rounded cursor-pointer hover:bg-red-400">
                                    <iconify-icon icon="material-symbols:delete-outline" width="24" height="24"></iconify-icon>
                                </button>
                                <button onClick={() => handleEdit(task)} className="bg-yellow-500 text-white flex items-center justify-center p-1 rounded cursor-pointer hover:bg-yellow-400 ml-2">
                                    <iconify-icon icon="material-symbols:edit-outline" width="24" height="24"></iconify-icon>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Tasks;
