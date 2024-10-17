"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCommandClient = void 0;
const uuid_1 = require("uuid");
class AppCommandClient {
    constructor(userId) {
        this.userId = userId;
    }
    newCommand(commandClass, payload, metadata) {
        const id = (0, uuid_1.v4)();
        const meta = Object.assign({ userId: this.userId, timestamp: new Date() }, metadata);
        return new commandClass(id, meta, payload);
    }
}
exports.AppCommandClient = AppCommandClient;
