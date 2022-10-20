"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = require("./helpers/corsOptions");
const dbConnection_1 = require("./config/dbConnection");
const helmet_1 = __importDefault(require("helmet"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const hotel_1 = __importDefault(require("./routes/hotel"));
const room_1 = __importDefault(require("./routes/room"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const PORT = process.env.PORT_NUMBER || 5000;
// MIDDLEWARES
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use((0, helmet_1.default)());
// Db connection
(0, dbConnection_1.connection)();
// Route calls
app.use('/api/v1', auth_1.default);
app.use('/api/v1', user_1.default);
app.use('/api/v1', hotel_1.default);
app.use('/api/v1', room_1.default);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map