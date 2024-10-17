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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoRegistry = void 0;
const common_1 = require("@nestjs/common");
const chat_repo_1 = require("../repositories/chat-repo");
const message_reaction_repo_1 = require("../repositories/message-reaction-repo");
const message_repo_1 = require("../repositories/message-repo");
let RepoRegistry = class RepoRegistry {
    constructor(_chatRepo, _messageRepo, _messageReactionRepo) {
        this._chatRepo = _chatRepo;
        this._messageRepo = _messageRepo;
        this._messageReactionRepo = _messageReactionRepo;
    }
    chatRepo() {
        return this._chatRepo;
    }
    messageRepo() {
        return this._messageRepo;
    }
    messageReactionRepo() {
        return this._messageReactionRepo;
    }
};
exports.RepoRegistry = RepoRegistry;
exports.RepoRegistry = RepoRegistry = __decorate([
    __param(0, (0, common_1.Inject)(chat_repo_1.ChatRepoModule.REPO)),
    __param(1, (0, common_1.Inject)(message_repo_1.MessageRepoModule.REPO)),
    __param(2, (0, common_1.Inject)(message_reaction_repo_1.MessageReactionRepoModule.REPO)),
    __metadata("design:paramtypes", [Object, Object, Object])
], RepoRegistry);
