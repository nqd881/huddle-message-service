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
exports.EditMessageReactionPolicyHandler = void 0;
const app_1 = require("../../app");
const app_command_1 = require("app-command");
const models_1 = require("../../../domain/models");
const inversify_1 = require("inversify");
const command_1 = require("./command");
let EditMessageReactionPolicyHandler = class EditMessageReactionPolicyHandler extends app_command_1.AppCommandHandler {
    constructor(repoRegistry, domainServiceRegistry) {
        super();
        this.repoRegistry = repoRegistry;
        this.domainServiceRegistry = domainServiceRegistry;
    }
    handle(commandId, commandMetadata, commandPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { userId } = commandMetadata;
            const { chatId, allowedReactions, restrictedReactions } = commandPayload;
            const newPolicy = new models_1.MessageReactionPolicy({
                allowedReactions: (_a = allowedReactions === null || allowedReactions === void 0 ? void 0 : allowedReactions.map((value) => new models_1.Reaction({ value }))) !== null && _a !== void 0 ? _a : [],
                restrictedReactions: (_b = restrictedReactions === null || restrictedReactions === void 0 ? void 0 : restrictedReactions.map((value) => new models_1.Reaction({ value }))) !== null && _b !== void 0 ? _b : [],
            });
            const chat = yield this.domainServiceRegistry
                .chatService()
                .editMessageReactionPolicy(userId, chatId, newPolicy);
            yield this.repoRegistry.chatRepo().save(chat);
            return this.complete(chatId);
        });
    }
};
exports.EditMessageReactionPolicyHandler = EditMessageReactionPolicyHandler;
exports.EditMessageReactionPolicyHandler = EditMessageReactionPolicyHandler = __decorate([
    (0, inversify_1.injectable)(),
    (0, app_command_1.HandlerForCommand)(command_1.EditMessageReactionPolicyCommand),
    __param(0, (0, inversify_1.inject)(app_1.RepoRegistryIdentifier)),
    __param(1, (0, inversify_1.inject)(app_1.DomainServiceRegistryIdentifier)),
    __metadata("design:paramtypes", [Object, Object])
], EditMessageReactionPolicyHandler);
