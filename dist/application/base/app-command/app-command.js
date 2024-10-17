"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCommand = void 0;
class AppCommand {
    constructor(id, metadata, payload) {
        this.id = id;
        this.metadata = metadata;
        this.payload = payload;
    }
    setResult(result) {
        this.result = result;
    }
}
exports.AppCommand = AppCommand;
