import {
  ParticipantService,
  IPermissionService,
  MessageService,
  ChatService,
} from "../../domain/services";

export interface IDomainServiceRegistry {
  chatService(): ChatService;
  messageService(): MessageService;
  participantService(): ParticipantService;
  permissionService(): IPermissionService;
}
