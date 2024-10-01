import Joi from "joi";

export const createUserSchema=Joi.object({
    name: Joi.string().min(3).max(40).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required()

})

