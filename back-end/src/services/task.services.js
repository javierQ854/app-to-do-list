import Task from "../models/task.models.js";

const TaskService = {
    crearTarea: async (tarea) => {
        return await Task.insertarTarea(tarea);
    },
    obtenerTareasPorUsuario: async (userId) => {
        return await Task.listarTareasPorUsuario(userId);
    },
    modificarTarea: async (tareaId, tarea) => {
        return await Task.actualizarTarea(tareaId, tarea);
    },
    eliminarTarea: async (tareaId) => {
        return await Task.eliminarTarea(tareaId);
    }
};

export default TaskService;
