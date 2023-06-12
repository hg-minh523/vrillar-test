"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const driverSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    point: { type: String, require: false },
    team: String,
    rank: String,
    // avatar: String
});
exports.Driver = (0, mongoose_1.model)('Driver', driverSchema);
