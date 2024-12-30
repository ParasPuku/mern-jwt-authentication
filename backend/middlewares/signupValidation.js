const Joi = require('joi');

const signupValidation = (req, res, next) => {
    console.log('Hello Ram1')

    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: "Bad Request", error });
    }
    next();
} 

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: "Bad Request", error });
    }
    next();
} 

const forgotPasswordValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: "Bad Request", error });
    }
    next();
} 

const resetPasswordValidation = (req, res, next) => {
    const schema = Joi.object({
        password: Joi.string().min(8).max(20).required(),
    });
    console.log("req.body", req.body)
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: "Bad Request", error });
    }
    next();
};  

module.exports = {
    signupValidation,
    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation
}