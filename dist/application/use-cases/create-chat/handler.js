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
exports.CreateChatHandler = void 0;
const app_1 = require("../../app");
const app_command_1 = require("app-command");
const models_1 = require("../../../domain/models");
const inversify_1 = require("inversify");
const command_1 = require("./command");
const ts_enum_util_1 = require("ts-enum-util");
let CreateChatHandler = class CreateChatHandler extends app_command_1.AppCommandHandler {
    constructor(repoRegistry) {
        super();
        this.repoRegistry = repoRegistry;
    }
    handle(commandId, commandMetadata, commandPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            const { userId } = commandMetadata;
            const { chatId, chatActionPolicy: chatActionPolicyPayload, messageActionPolicy: messageActionPolicyPayload, messageContentPolicy: messageContentPolicyPayload, messageReactionPolicy: messageReactionPolicyPayload, } = commandPayload;
            const chatActionPolicy = new models_1.ChatActionPolicy({
                allowedActions: (_b = (_a = chatActionPolicyPayload === null || chatActionPolicyPayload === void 0 ? void 0 : chatActionPolicyPayload.allowed) === null || _a === void 0 ? void 0 : _a.map((value) => (0, ts_enum_util_1.$enum)(models_1.ChatAction).getValueOrThrow(value))) !== null && _b !== void 0 ? _b : [],
                restrictedActions: (_d = (_c = chatActionPolicyPayload === null || chatActionPolicyPayload === void 0 ? void 0 : chatActionPolicyPayload.restricted) === null || _c === void 0 ? void 0 : _c.map((value) => (0, ts_enum_util_1.$enum)(models_1.ChatAction).getValueOrThrow(value))) !== null && _d !== void 0 ? _d : [],
            });
            const messageActionPolicy = new models_1.MessageActionPolicy({
                allowedActions: (_f = (_e = messageActionPolicyPayload === null || messageActionPolicyPayload === void 0 ? void 0 : messageActionPolicyPayload.allowed) === null || _e === void 0 ? void 0 : _e.map((value) => (0, ts_enum_util_1.$enum)(models_1.MessageAction).getValueOrThrow(value))) !== null && _f !== void 0 ? _f : [],
                restrictedActions: (_h = (_g = messageActionPolicyPayload === null || messageActionPolicyPayload === void 0 ? void 0 : messageActionPolicyPayload.restricted) === null || _g === void 0 ? void 0 : _g.map((value) => (0, ts_enum_util_1.$enum)(models_1.MessageAction).getValueOrThrow(value))) !== null && _h !== void 0 ? _h : [],
            });
            const messageContentPolicy = new models_1.MessageContentPolicy({
                allowedTypes: (_k = (_j = messageContentPolicyPayload === null || messageContentPolicyPayload === void 0 ? void 0 : messageContentPolicyPayload.allowed) === null || _j === void 0 ? void 0 : _j.map((value) => (0, ts_enum_util_1.$enum)(models_1.MessageContentType).getValueOrThrow(value))) !== null && _k !== void 0 ? _k : [],
                restrictedTypes: (_m = (_l = messageContentPolicyPayload === null || messageContentPolicyPayload === void 0 ? void 0 : messageContentPolicyPayload.restricted) === null || _l === void 0 ? void 0 : _l.map((value) => (0, ts_enum_util_1.$enum)(models_1.MessageContentType).getValueOrThrow(value))) !== null && _m !== void 0 ? _m : [],
            });
            const messageReactionPolicy = new models_1.MessageReactionPolicy({
                allowedReactions: (_p = (_o = messageReactionPolicyPayload === null || messageReactionPolicyPayload === void 0 ? void 0 : messageReactionPolicyPayload.allowed) === null || _o === void 0 ? void 0 : _o.map((value) => new models_1.Reaction({ value }))) !== null && _p !== void 0 ? _p : [],
                restrictedReactions: (_r = (_q = messageReactionPolicyPayload === null || messageReactionPolicyPayload === void 0 ? void 0 : messageReactionPolicyPayload.restricted) === null || _q === void 0 ? void 0 : _q.map((value) => new models_1.Reaction({ value }))) !== null && _r !== void 0 ? _r : [],
            });
            const chat = models_1.Chat.create(chatId, {
                chatActionPolicy,
                messageActionPolicy,
                messageContentPolicy,
                messageReactionPolicy,
            });
            yield this.repoRegistry.chatRepo().save(chat);
            return this.complete(chatId);
        });
    }
};
exports.CreateChatHandler = CreateChatHandler;
exports.CreateChatHandler = CreateChatHandler = __decorate([
    (0, inversify_1.injectable)(),
    (0, app_command_1.HandlerForCommand)(command_1.CreateChatCommand),
    __param(0, (0, inversify_1.inject)(app_1.RepoRegistryIdentifier)),
    __metadata("design:paramtypes", [Object])
], CreateChatHandler);
