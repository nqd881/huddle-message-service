import { Module } from "@nestjs/common";
import { MessageDomainService } from "./message-domain-service";
import { ParticipantDomainServiceModule } from "../participant-domain-service";
import { RepoRegistryModule } from "infrastructure/modules/repo-registry";

@Module({
  imports: [RepoRegistryModule, ParticipantDomainServiceModule],
  providers: [
    {
      provide: MessageDomainServiceModule.SERVICE,
      useClass: MessageDomainService,
    },
  ],
  exports: [MessageDomainServiceModule.SERVICE],
})
export class MessageDomainServiceModule {
  static readonly SERVICE = Symbol.for("MESSAGE_DOMAIN_SERVICE");
}
