import { Module } from "@nestjs/common";
import { PermissionDomainServiceModule } from "../permission-domain-service";
import { ParticipantDomainService } from "./participant-domain-service";

@Module({
  imports: [PermissionDomainServiceModule],
  providers: [
    {
      provide: ParticipantDomainServiceModule.SERVICE,
      useClass: ParticipantDomainService,
    },
  ],
  exports: [ParticipantDomainServiceModule.SERVICE],
})
export class ParticipantDomainServiceModule {
  static readonly SERVICE = Symbol.for("PARTICIPANT_DOMAIN_SERVICE");
}
