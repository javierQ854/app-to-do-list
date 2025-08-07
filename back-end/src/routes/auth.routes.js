import express from 'express';
import authController from '../controllers/auth.controller.js';
import taskController from '../controllers/task.controller.js';
import isAuthenticated from '../middlewers/auth.middlewers.js';
const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: User
 *               password_user:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos inválidos o usuario ya existe
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: User
 *               password_user:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login',  authController.login);


//RUTAS DE TAREAS

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Comprar leche
 *               description:
 *                 type: string
 *                 example: Ir al supermercado y comprar leche descremada
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/task',isAuthenticated,  taskController.crearTarea);

/**
 * @swagger
 * /task/{userId}:
 *   get:
 *     summary: Obtener todas las tareas de un usuario
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de tareas del usuario
 *       404:
 *         description: Usuario no encontrado o sin tareas
 */
router.get('/task/:userId', isAuthenticated, taskController.obtenerTareasPorUsuario);

/**
 * @swagger
 * /task/{tareaId}:
 *   put:
 *     summary: Modificar una tarea existente
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tareaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Comprar pan
 *               description:
 *                 type: string
 *                 example: Ir a la panadería y comprar pan integral
 *     responses:
 *       200:
 *         description: Tarea modificada exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Tarea no encontrada
 */
router.put('/task/:tareaId', isAuthenticated, taskController.modificarTarea);

/**
 * @swagger
 * /task/{tareaId}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tareaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/task/:tareaId', isAuthenticated, taskController.eliminarTarea);

export default router;