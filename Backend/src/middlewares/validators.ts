import { NextFunction, Request, Response } from "express";
import { body, validationResult, check } from "express-validator";



export const validatorSchema = [
    // username must be an email
body('email', 'Please enter a  valid email address').isEmail(),
// password must be at least 5 chars long
body('password', 'Password must be a minimum of 5 characters').isLength({ min: 5 }),
check('password', 'Please provide a strong password, must include uppercase, lowercase, numeric and symbols')
.isStrongPassword( {minLowercase:1, minNumbers:1, minUppercase:1, minSymbols:1}),
]
export const passwordValidator = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
}
    next()
}