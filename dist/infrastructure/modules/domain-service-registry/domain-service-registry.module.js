"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainServiceRegistryModule = void 0;
const common_1 = require("@nestjs/common");
const chat_domain_service_1 = require("../domain-services/chat-domain-service");
const message_domain_service_1 = require("../domain-services/message-domain-service");
const participant_domain_service_1 = require("../domain-services/participant-domain-service");
const permission_domain_service_1 = require("../domain-services/permission-domain-service");
const domain_service_registry_1 = require("./domain-service-registry");
let DomainServiceRegistryModule = class DomainServiceRegistryModule {
};
exports.DomainServiceRegistryModule = DomainServiceRegistryModule;
DomainServiceRegistryModule.REGISTRY = Symbol.for("DOMAIN_SERVICE_REGISTRY");
exports.DomainServiceRegistryModule = DomainServiceRegistryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            chat_domain_service_1.ChatDomainServiceModule,
            message_domain_service_1.MessageDomainServiceModule,
            participant_domain_service_1.ParticipantDomainServiceModule,
            permission_domain_service_1.PermissionDomainServiceModule,
        ],
        providers: [
            {
                provide: DomainServiceRegistryModule.REGISTRY,
                useClass: domain_service_registry_1.DomainServiceRegistry,
            },
        ],
        exports: [DomainServiceRegistryModule.REGISTRY],
    })
], DomainServiceRegistryModule);
