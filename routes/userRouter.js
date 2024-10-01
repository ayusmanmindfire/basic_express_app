import { Router } from "express"
import jwt from "jsonwebtoken";
import User from '../database/models/userModel.js'
import 'dotenv/config'
import { errorResponse, successResponse } from "../responseHandler/response.js";
import { createUserSchema } from "../validation/userValidation.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = Router();
const secretKey=process.env.SECRET;

router.post('/', async (req, res, next) => {
    try {
        const userData = req.body;
        // console.log(userData)
        // throw new Error("hello")
        const isValid = createUserSchema.validate(userData)
        if (isValid.error) {
            return errorResponse(res, isValid.error.message, 400)
        }
        const userResponse = await User.create(userData);

        successResponse(res, userResponse, "new user created", 201)
    } catch (error) {
        next(error)
    }

})

router.post('/login', async (req, res, next) => {
    try {
        const { name, email } = req.body;
        if(!name||!email){
            return errorResponse(res,"Provide name and email",400)
        }
        const existingUser = await User.findOne({email});
        if (existingUser) {
            const token = jwt.sign(
                {
                    name: existingUser.name,
                    email: existingUser.email,
                    phone: existingUser.phone
                },
                secretKey,
                {expiresIn: '24h'}

            )
            return successResponse(res,token,"Token generated",200)
        }
        else{
            return errorResponse(res,"User not found",404)
        }
    } catch (error) {
        next(error)
    }
})

router.get('/', verifyToken, async (req, res, next) => {
    try {
        const allUsers = await User.find();
        // console.log(req.user.name)
        successResponse(res, allUsers, "All users fetched", 200)
    } catch (error) {
        next(error)
    }
})
export default router;

