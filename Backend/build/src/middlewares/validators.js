"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidator = exports.validatorSchema = void 0;
const express_validator_1 = require("express-validator");
exports.validatorSchema = [
    // username must be an email
    (0, express_validator_1.body)('email', 'Please enter a  valid email address').isEmail(),
    // password must be at least 5 chars long
    (0, express_validator_1.body)('password', 'Password must be a minimum of 5 characters').isLength({ min: 5 }),
    (0, express_validator_1.check)('password', 'Please provide a strong password, must include uppercase, lowercase, numeric and symbols')
        .isStrongPassword({ minLowercase: 1, minNumbers: 1, minUppercase: 1, minSymbols: 1 }),
];
const passwordValidator = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.passwordValidator = passwordValidator;
//# sourceMappingURL=validators.js.map