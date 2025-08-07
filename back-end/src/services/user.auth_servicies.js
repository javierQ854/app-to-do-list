import bycrpt from 'bcrypt';
import UserAuth  from '../models/user.auth.js';
import autenticar from '../utils/jwt.js'; 

const UserAuthService = {
    registerUser: async (userData) => {
        const { username,   password_user } = userData;
        const existingUser = await UserAuth.buscarusuarioPorNombre(username);
        if (existingUser) {
            throw new Error('El nombre de usuario ya está en uso');
        }

        const hashedPassword = await bycrpt.hash(password_user, 10);
        const newUser = await UserAuth.insertarUsuario({ username, password_user: hashedPassword });
        return newUser;
    },  
    loginUser: async (username, password_user) => {
        const user = await UserAuth.buscarusuarioPorNombre(username);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isPasswordValid = await bycrpt.compare(password_user, user.password_user);
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        const token = autenticar.generateToken(user);
        return { user, token };
    },
    listUsers: async () => {
        const users = await UserAuth.listarUsuarios();
        return users;
    }
};

export default UserAuthService;