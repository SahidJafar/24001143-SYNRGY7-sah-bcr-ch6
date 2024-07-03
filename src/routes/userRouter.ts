import { Router } from "express"
import RouteGroup from "express-route-grouping"
import { UserController } from "../controllers/user.controller"
import { authenticateToken, authenticateTokenAdmin, authenticateTokenSuperAdmin } from "../middlewares/authorization"

const router = Router()
// const root = new RouteGroup('/', router);

const userController = new UserController()

// users
// root.group('/', (users) => {
//     //register admin
//     users.post('/', authenticateTokenSuperAdmin, userController.store.bind(userController));
//     //login
//     users.post('/login', userController.login.bind(userController));
//     //whoami
//     users.get('/me', authenticateToken, userController.whoami.bind(userController));
//     //list
//     users.get('/', authenticateTokenAdmin, userController.list.bind(userController));
//     //refresh token
//     users.post('/refresh-token', userController.refreshToken.bind(userController));
//     //register member
//     users.post('/register', userController.register.bind(userController));
//     //logout
//     users.post('/logout',authenticateToken, userController.logout.bind(userController));
// });

//register admin
router.post("/", authenticateTokenSuperAdmin, userController.store.bind(userController))
//login
router.post("/login", userController.login.bind(userController))
//login with Google
router.post("/auth/google", userController.loginWithGoogle.bind(userController))
//whoami
router.get("/me", authenticateToken, userController.whoami.bind(userController))
//list
router.get("/", authenticateTokenAdmin, userController.list.bind(userController))
//refresh token
router.post("/refresh-token", userController.refreshToken.bind(userController))
//register member
router.post("/register", userController.register.bind(userController))
//logout
router.post("/logout", authenticateToken, userController.logout.bind(userController))

export default router
