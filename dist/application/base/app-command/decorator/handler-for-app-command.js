"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerForCommand = void 0;
const HandlerForCommand = (commandType) => {
    return (target) => {
        Reflect.defineMetadata("APP_COMMAND_TYPE", commandType, target);
    };
};
exports.HandlerForCommand = HandlerForCommand;
