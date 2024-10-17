"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatDomainServiceModule = void 0;
const common_1 = require("@nestjs/common");
const chat_domain_service_1 = require("./chat-domain-service");
const repo_registry_1 = require("../../repo-registry");
const participant_domain_service_1 = require("../participant-domain-service");
let ChatDomainServiceModule = class ChatDomainServiceModule {
};
exports.ChatDomainServiceModule = ChatDomainServiceModule;
ChatDomainServiceModule.SERVICE = Symbol.for("CHAT_DOMAIN_SERVICE");
exports.ChatDomainServiceModule = ChatDomainServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [repo_registry_1.RepoRegistryModule, participant_domain_service_1.ParticipantDomainServiceModule],
        providers: [
            {
                provide: ChatDomainServiceModule.SERVICE,
                useClass: chat_domain_service_1.ChatDomainService,
            },
        ],
        exports: [ChatDomainServiceModule.SERVICE],
    })
], ChatDomainServiceModule);
