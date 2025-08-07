import UserAuthService from '../services/user.auth_servicies.js';

const authController = {
    register: async (req, res) => {
        try {
            const userData = req.body;
            const newUser = await UserAuthService.registerUser(userData);
            res.status(201).json({ message: 'Usuario registrado exitosamente', userId: newUser });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { username, password_user } = req.body;
            const { user, token } = await UserAuthService.loginUser(username, password_user);
            // eslint-disable-next-line no-unused-vars
            const { password_user: _, create_at, ...safeUser } = user;

            res.status(200).json({
                message: 'Inicio de sesión exitoso',
                user: safeUser,
                token
            });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
};

export default authController;
