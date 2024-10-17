"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCommandResult = void 0;
const interfaces_1 = require("./interfaces");
class AppCommandResult {
    static succeeded(commandId, data) {
        return new AppCommandResult(commandId, interfaces_1.AppCommandStatus.Succeeded, data);
    }
    static inProgress(commandId, data) {
        return new AppCommandResult(commandId, interfaces_1.AppCommandStatus.InProgress, data);
    }
    static failed(commandId, error) {
        return new AppCommandResult(commandId, interfaces_1.AppCommandStatus.Failed, undefined, error);
    }
    constructor(commandId, status, data, error) {
        this.commandId = commandId;
        this.status = status;
        this.data = data;
        this.error = error;
    }
    isSucceeded() {
        return this.status === interfaces_1.AppCommandStatus.Succeeded;
    }
    isFailed() {
        return this.status === interfaces_1.AppCommandStatus.Failed;
    }
    isInProgress() {
        return this.status === interfaces_1.AppCommandStatus.InProgress;
    }
    isForCommand(command) {
        return this.matchesCommandId(command.id);
    }
    matchesCommandId(commandId) {
        return this.commandId === commandId;
    }
}
exports.AppCommandResult = AppCommandResult;
