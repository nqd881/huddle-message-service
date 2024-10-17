import { Inject, Injectable } from "@nestjs/common";
import { IDomainServiceRegistry } from "application/abstractions";
import {
  ChatService,
  IPermissionService,
  MessageService,
  ParticipantService,
} from "domain/services";
import { ChatDomainServiceModule } from "../domain-services/chat-domain-service";
import { MessageDomainServiceModule } from "../domain-services/message-domain-service";
import { ParticipantDomainServiceModule } from "../domain-services/participant-domain-service";
import { PermissionDomainServiceModule } from "../domain-services/permission-domain-service";

@Injectable()
export class DomainServiceRegistry implements IDomainServiceRegistry {
  constructor(
    @Inject(ChatDomainServiceModule.SERVICE) private _chatService: ChatService,
    @Inject(MessageDomainServiceModule.SERVICE)
    private _messageService: MessageService,
    @Inject(ParticipantDomainServiceModule.SERVICE)
    private _participantService: ParticipantService,
    @Inject(PermissionDomainServiceModule.SERVICE)
    private _permissionService: IPermissionService
  ) {}

  chatService(): ChatService {
    return this._chatService;
  }

  messageService(): MessageService {
    return this._messageService;
  }

  participantService(): ParticipantService {
    return this._participantService;
  }

  permissionService(): IPermissionService {
    return this._permissionService;
  }
}
