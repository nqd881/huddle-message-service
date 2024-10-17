"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantDomainServiceModule = void 0;
const common_1 = require("@nestjs/common");
const permission_domain_service_1 = require("../permission-domain-service");
const participant_domain_service_1 = require("./participant-domain-service");
let ParticipantDomainServiceModule = class ParticipantDomainServiceModule {
};
exports.ParticipantDomainServiceModule = ParticipantDomainServiceModule;
ParticipantDomainServiceModule.SERVICE = Symbol.for("PARTICIPANT_DOMAIN_SERVICE");
exports.ParticipantDomainServiceModule = ParticipantDomainServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [permission_domain_service_1.PermissionDomainServiceModule],
        providers: [
            {
                provide: ParticipantDomainServiceModule.SERVICE,
                useClass: participant_domain_service_1.ParticipantDomainService,
            },
        ],
        exports: [ParticipantDomainServiceModule.SERVICE],
    })
], ParticipantDomainServiceModule);
