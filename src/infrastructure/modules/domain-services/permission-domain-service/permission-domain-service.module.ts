import { Module } from "@nestjs/common";
import { PermissionDomainService } from "./permission-domain-service";

@Module({
  providers: [
    {
      provide: PermissionDomainServiceModule.SERVICE,
      useClass: PermissionDomainService,
    },
  ],
  exports: [PermissionDomainServiceModule.SERVICE],
})
export class PermissionDomainServiceModule {
  static readonly SERVICE = Symbol.for("PERMISSION_DOMAIN_SERVICE");
}
