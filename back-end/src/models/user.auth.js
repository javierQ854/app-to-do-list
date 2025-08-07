import db from '../config/db.js';

const UserAuth = {
    insertarUsuario: async (usuario) => {
        const { username, password_user } = usuario;
        const query = 'INSERT INTO users (username, password_user) VALUES (?, ?)';
        const [result] = await db.query(query, [username, password_user]);
        return result.insertId;
    },
    buscarusuarioPorNombre: async (username) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        const [rows] = await db.query(query, [username]);
        return rows[0];
    },      
    listarUsuarios: async () => {
        const query = 'SELECT * FROM users';
        const [rows] = await db.query(query);
        return rows;
    }
};

export default UserAuth;
