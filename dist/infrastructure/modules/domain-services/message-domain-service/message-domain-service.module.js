"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDomainServiceModule = void 0;
const common_1 = require("@nestjs/common");
const message_domain_service_1 = require("./message-domain-service");
const participant_domain_service_1 = require("../participant-domain-service");
const repo_registry_1 = require("../../repo-registry");
let MessageDomainServiceModule = class MessageDomainServiceModule {
};
exports.MessageDomainServiceModule = MessageDomainServiceModule;
MessageDomainServiceModule.SERVICE = Symbol.for("MESSAGE_DOMAIN_SERVICE");
exports.MessageDomainServiceModule = MessageDomainServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [repo_registry_1.RepoRegistryModule, participant_domain_service_1.ParticipantDomainServiceModule],
        providers: [
            {
                provide: MessageDomainServiceModule.SERVICE,
                useClass: message_domain_service_1.MessageDomainService,
            },
        ],
        exports: [MessageDomainServiceModule.SERVICE],
    })
], MessageDomainServiceModule);
