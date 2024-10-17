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
exports.DomainServiceRegistry = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("../../../domain/services");
const chat_domain_service_1 = require("../domain-services/chat-domain-service");
const message_domain_service_1 = require("../domain-services/message-domain-service");
const participant_domain_service_1 = require("../domain-services/participant-domain-service");
const permission_domain_service_1 = require("../domain-services/permission-domain-service");
let DomainServiceRegistry = class DomainServiceRegistry {
    constructor(_chatService, _messageService, _participantService, _permissionService) {
        this._chatService = _chatService;
        this._messageService = _messageService;
        this._participantService = _participantService;
        this._permissionService = _permissionService;
    }
    chatService() {
        return this._chatService;
    }
    messageService() {
        return this._messageService;
    }
    participantService() {
        return this._participantService;
    }
    permissionService() {
        return this._permissionService;
    }
};
exports.DomainServiceRegistry = DomainServiceRegistry;
exports.DomainServiceRegistry = DomainServiceRegistry = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(chat_domain_service_1.ChatDomainServiceModule.SERVICE)),
    __param(1, (0, common_1.Inject)(message_domain_service_1.MessageDomainServiceModule.SERVICE)),
    __param(2, (0, common_1.Inject)(participant_domain_service_1.ParticipantDomainServiceModule.SERVICE)),
    __param(3, (0, common_1.Inject)(permission_domain_service_1.PermissionDomainServiceModule.SERVICE)),
    __metadata("design:paramtypes", [services_1.ChatService,
        services_1.MessageService,
        services_1.ParticipantService, Object])
], DomainServiceRegistry);
