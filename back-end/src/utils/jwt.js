import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

const autenticar = {
    generateToken: (user) => {
        return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    },

    verifyToken: (token) => {
        return jwt.verify(token, JWT_SECRET);
    },
    decodeToken: (token) => {
        return jwt.decode(token);
    },
    isAuthenticated: (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Se necesita el token de acceso' });
        }

        try {
            const decoded = autenticar.verifyToken(token);
            req.user = decoded;
            next();
        } catch {
            return res.status(401).json({ message: 'Token invalido' });
        }
    }
}
export default autenticar;
