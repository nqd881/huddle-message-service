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
exports.ChatDomainService = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("../../../../domain/services");
const repo_registry_1 = require("../../repo-registry");
const participant_domain_service_1 = require("../participant-domain-service");
let ChatDomainService = class ChatDomainService extends services_1.ChatService {
    constructor(repoRegistry, participantService) {
        super(repoRegistry.chatRepo(), participantService);
    }
};
exports.ChatDomainService = ChatDomainService;
exports.ChatDomainService = ChatDomainService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(repo_registry_1.RepoRegistryModule.REGISTRY)),
    __param(1, (0, common_1.Inject)(participant_domain_service_1.ParticipantDomainServiceModule.SERVICE)),
    __metadata("design:paramtypes", [Object, services_1.ParticipantService])
], ChatDomainService);
