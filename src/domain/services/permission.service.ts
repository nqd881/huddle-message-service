import { Id } from "ddd-node";

export interface IPermissionService {
  canUserSendMessage(userId: Id, chatId: Id): Promise<boolean>;

  canUserForwardMessage(
    userId: Id,
    originalChatId: Id,
    targetChatId: Id
  ): Promise<boolean>;

  canUserReactMessage(userId: Id, chatId: Id): Promise<boolean>;

  canUserEditOwnMessage(userId: Id, chatId: Id): Promise<boolean>;

  canUserEditChatActionPolicy(userId: Id, chatId: Id): Promise<boolean>;

  canUserEditMessageActionPolicy(userId: Id, chatId: Id): Promise<boolean>;

  canUserEditMessageContentPolicy(userId: Id, chatId: Id): Promise<boolean>;

  canUserEditMessageReactionPolicy(userId: Id, chatId: Id): Promise<boolean>;
}
