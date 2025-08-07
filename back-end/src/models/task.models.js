import db from '../config/db.js';

const Task = {
    insertarTarea: async (tarea) => {
        const { title, description, userId } = tarea;
        const query = 'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [title, description, userId]);
        return result.insertId;
    },  
    listarTareasPorUsuario: async (userId) => {
        const query = 'SELECT * FROM tasks WHERE user_id = ?';
        const [rows] = await db.query(query, [userId]);
        return rows;
    },
    actualizarTarea: async (tareaId, tarea) => {
        const { title, description } = tarea;
        const query = 'UPDATE tasks SET title = ?, description = ? WHERE id = ?';
        const [result] = await db.query(query, [title, description, tareaId]);
        return result.affectedRows > 0;
    },
    eliminarTarea: async (tareaId) => {
        const query = 'DELETE FROM tasks WHERE id = ?';
        const [result] = await db.query(query, [tareaId]);
        return result.affectedRows > 0;
    }
};
export default Task;