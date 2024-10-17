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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.SendMessageHandler = void 0;
const app_1 = require("../../app");
const app_command_1 = require("app-command");
const models_1 = require("../../../domain/models");
const inversify_1 = require("inversify");
const command_1 = require("./command");
let SendMessageHandler = class SendMessageHandler extends app_command_1.AppCommandHandler {
    constructor(repoRegistry, domainServiceRegistry) {
        super();
        this.repoRegistry = repoRegistry;
        this.domainServiceRegistry = domainServiceRegistry;
    }
    handle(commandId, commandMetadata, commandPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = commandMetadata;
            const { chatId, replyMessageId, contentText } = commandPayload;
            const content = new models_1.MessageContentText({ text: contentText });
            const message = yield this.domainServiceRegistry
                .messageService()
                .sendMessage(userId, chatId, content, replyMessageId);
            yield this.repoRegistry.messageRepo().save(message);
            return this.complete(message.id());
        });
    }
};
exports.SendMessageHandler = SendMessageHandler;
exports.SendMessageHandler = SendMessageHandler = __decorate([
    (0, inversify_1.injectable)(),
    (0, app_command_1.HandlerForCommand)(command_1.SendMessageCommand),
    __param(0, (0, inversify_1.inject)(app_1.RepoRegistryIdentifier)),
    __param(1, (0, inversify_1.inject)(app_1.DomainServiceRegistryIdentifier)),
    __metadata("design:paramtypes", [Object, Object])
], SendMessageHandler);
