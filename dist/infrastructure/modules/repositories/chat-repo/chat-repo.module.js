"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepoModule = void 0;
const common_1 = require("@nestjs/common");
const in_memory_chat_repo_1 = require("./in-memory-chat-repo");
let ChatRepoModule = class ChatRepoModule {
};
exports.ChatRepoModule = ChatRepoModule;
ChatRepoModule.REPO = Symbol.for("CHAT_REPO");
exports.ChatRepoModule = ChatRepoModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: ChatRepoModule.REPO,
                useClass: in_memory_chat_repo_1.InMemoryChatRepo,
            },
        ],
        exports: [ChatRepoModule.REPO],
    })
], ChatRepoModule);
