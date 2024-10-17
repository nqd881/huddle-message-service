"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCoreModule = void 0;
const common_1 = require("@nestjs/common");
const app_1 = require("../../../application/app");
const domain_service_registry_1 = require("../domain-service-registry");
const repo_registry_1 = require("../repo-registry");
let AppCoreModule = class AppCoreModule {
};
exports.AppCoreModule = AppCoreModule;
AppCoreModule.APP_CORE = Symbol.for("APP_CORE");
exports.AppCoreModule = AppCoreModule = __decorate([
    (0, common_1.Module)({
        imports: [repo_registry_1.RepoRegistryModule, domain_service_registry_1.DomainServiceRegistryModule],
        providers: [
            {
                provide: AppCoreModule.APP_CORE,
                useFactory: (repoRegistry, domainServiceRegistry) => {
                    const app = new app_1.App(repoRegistry, domainServiceRegistry);
                    return app;
                },
                inject: [
                    repo_registry_1.RepoRegistryModule.REGISTRY,
                    domain_service_registry_1.DomainServiceRegistryModule.REGISTRY,
                ],
            },
        ],
        exports: [AppCoreModule.APP_CORE],
    })
], AppCoreModule);
