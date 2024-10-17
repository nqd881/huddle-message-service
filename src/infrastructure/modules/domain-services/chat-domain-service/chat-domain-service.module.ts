import { Module } from "@nestjs/common";
import { ChatDomainService } from "./chat-domain-service";
import { RepoRegistryModule } from "infrastructure/modules/repo-registry";
import { ParticipantDomainServiceModule } from "../participant-domain-service";

@Module({
  imports: [RepoRegistryModule, ParticipantDomainServiceModule],
  providers: [
    {
      provide: ChatDomainServiceModule.SERVICE,
      useClass: ChatDomainService,
    },
  ],
  exports: [ChatDomainServiceModule.SERVICE],
})
export class ChatDomainServiceModule {
  static readonly SERVICE = Symbol.for("CHAT_DOMAIN_SERVICE");
}
