import express from 'express'
const router = express.Router()
import { 
    RegisterUser,
    LoginUser,
    VerifyUser,
    UserLogout
} from '../controllers/userController.js'
import { auth } from '../middlewares/auth.js'

/**
 * Public APIS
 */
router.post('/users/login', LoginUser )
router.post('/users/register', RegisterUser)
router.post('/users/:id/verify', VerifyUser)

/***
 * Private APIS
 */
router.post('/users/logout',auth, UserLogout)



export default router
