import { Module } from "@nestjs/common";
import { ChatDomainServiceModule } from "../domain-services/chat-domain-service";
import { MessageDomainServiceModule } from "../domain-services/message-domain-service";
import { ParticipantDomainServiceModule } from "../domain-services/participant-domain-service";
import { PermissionDomainServiceModule } from "../domain-services/permission-domain-service";
import { DomainServiceRegistry } from "./domain-service-registry";

@Module({
  imports: [
    ChatDomainServiceModule,
    MessageDomainServiceModule,
    ParticipantDomainServiceModule,
    PermissionDomainServiceModule,
  ],
  providers: [
    {
      provide: DomainServiceRegistryModule.REGISTRY,
      useClass: DomainServiceRegistry,
    },
  ],
  exports: [DomainServiceRegistryModule.REGISTRY],
})
export class DomainServiceRegistryModule {
  static readonly REGISTRY = Symbol.for("DOMAIN_SERVICE_REGISTRY");
}
