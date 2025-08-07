import TaskService from "../services/task.services.js";

const taskController = {
    crearTarea: async (req, res) => {
        try {
            const tareaData = req.body;
            const nuevaTareaId = await TaskService.crearTarea(tareaData);
            res.status(201).json({ message: 'Tarea creada exitosamente', taskId: nuevaTareaId });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    obtenerTareasPorUsuario: async (req, res) => {
        try {
            const userId = req.params.userId;
            const tareas = await TaskService.obtenerTareasPorUsuario(userId);
            res.status(200).json(tareas);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    modificarTarea: async (req, res) => {
        try {
            const tareaId = req.params.tareaId;
            const tareaData = req.body;
            const exito = await TaskService.modificarTarea(tareaId, tareaData);
            if (exito) {
                res.status(200).json({ message: 'Tarea actualizada exitosamente' });
            } else {
                res.status(404).json({ message: 'Tarea no encontrada' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    eliminarTarea: async (req, res) => {
        try {
            const tareaId = req.params.tareaId;
            const exito = await TaskService.eliminarTarea(tareaId);
            if (exito) {
                res.status(200).json({ message: 'Tarea eliminada exitosamente' });
            } else {
                res.status(404).json({ message: 'Tarea no encontrada' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

export default taskController;
