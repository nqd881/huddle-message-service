"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCommandHandler = void 0;
const inversify_1 = require("inversify");
const app_command_result_1 = require("./app-command-result");
let AppCommandHandler = class AppCommandHandler {
    static commandType() {
        return Reflect.getMetadata("APP_COMMAND_TYPE", this);
    }
    constructor() {
        this.executed = false;
        this.completed = false;
    }
    commandType() {
        return this.constructor.commandType();
    }
    handleCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.executed)
                throw new Error("This command handler is executed before");
            try {
                const resultData = yield this.handle(command.id, command.metadata, command.payload);
                if (resultData) {
                    this.data = resultData;
                }
                if (!this.completed)
                    return app_command_result_1.AppCommandResult.inProgress(command.id, this.data);
                return app_command_result_1.AppCommandResult.succeeded(command.id, this.data);
            }
            catch (error) {
                return app_command_result_1.AppCommandResult.failed(command.id, error);
            }
            finally {
                this.executed = true;
            }
        });
    }
    complete(data) {
        this.completed = true;
        return data;
    }
};
exports.AppCommandHandler = AppCommandHandler;
exports.AppCommandHandler = AppCommandHandler = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], AppCommandHandler);
