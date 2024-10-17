"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoRegistryModule = void 0;
const common_1 = require("@nestjs/common");
const chat_repo_1 = require("../repositories/chat-repo");
const message_reaction_repo_1 = require("../repositories/message-reaction-repo");
const message_repo_1 = require("../repositories/message-repo");
const repo_registry_1 = require("./repo-registry");
let RepoRegistryModule = class RepoRegistryModule {
};
exports.RepoRegistryModule = RepoRegistryModule;
RepoRegistryModule.REGISTRY = Symbol.for("REPO_REGISTRY");
exports.RepoRegistryModule = RepoRegistryModule = __decorate([
    (0, common_1.Module)({
        imports: [chat_repo_1.ChatRepoModule, message_repo_1.MessageRepoModule, message_reaction_repo_1.MessageReactionRepoModule],
        providers: [
            {
                provide: RepoRegistryModule.REGISTRY,
                useClass: repo_registry_1.RepoRegistry,
            },
        ],
        exports: [
            RepoRegistryModule.REGISTRY,
            // re-export repo modules
            chat_repo_1.ChatRepoModule,
            message_repo_1.MessageRepoModule,
            message_reaction_repo_1.MessageReactionRepoModule,
        ],
    })
], RepoRegistryModule);
