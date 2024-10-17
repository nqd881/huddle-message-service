"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageReactionRepoModule = void 0;
const common_1 = require("@nestjs/common");
const in_memory_message_reaction_repo_1 = require("./in-memory-message-reaction-repo");
let MessageReactionRepoModule = class MessageReactionRepoModule {
};
exports.MessageReactionRepoModule = MessageReactionRepoModule;
MessageReactionRepoModule.REPO = Symbol.for("MESSAGE_REACTION_REPO");
exports.MessageReactionRepoModule = MessageReactionRepoModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: MessageReactionRepoModule.REPO,
                useClass: in_memory_message_reaction_repo_1.InMemoryMessageReactionRepo,
            },
        ],
        exports: [MessageReactionRepoModule.REPO],
    })
], MessageReactionRepoModule);
