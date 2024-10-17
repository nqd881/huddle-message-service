import { Inject, Injectable } from "@nestjs/common";
import { IRepoRegistry } from "application/abstractions";
import { ChatService, ParticipantService } from "domain/services";
import { RepoRegistryModule } from "infrastructure/modules/repo-registry";
import { ParticipantDomainServiceModule } from "../participant-domain-service";

@Injectable()
export class ChatDomainService extends ChatService {
  constructor(
    @Inject(RepoRegistryModule.REGISTRY) repoRegistry: IRepoRegistry,
    @Inject(ParticipantDomainServiceModule.SERVICE)
    participantService: ParticipantService
  ) {
    super(repoRegistry.chatRepo(), participantService);
  }
}
