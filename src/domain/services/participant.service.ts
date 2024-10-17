import { Id } from "ddd-node";
import {
  Chat,
  ChatAction,
  ChatActionPolicy,
  Message,
  MessageAction,
  MessageActionPolicy,
  MessageContentLike,
  MessageContentPolicy,
  MessageEditor,
  MessageForwarder,
  MessageReacter,
  MessageReactionPolicy,
  MessageSender,
  PolicyManager,
  Reaction,
} from "domain/models";
import { IPermissionService } from "./permission.service";

export class ParticipantService {
  constructor(private permissionService: IPermissionService) {}

  async messageSenderFrom(userId: Id, chat: Chat, content: MessageContentLike) {
    chat.ensureCanPerformMessageAction(MessageAction.SendMessage);

    chat.ensureCanSendContentType(content.type);

    const userCanSendMessage = await this.permissionService.canUserSendMessage(
      userId,
      chat.id()
    );

    if (!userCanSendMessage) throw new Error("User cannot send message");

    return new MessageSender({
      userId,
      chatId: chat.id(),
      content,
    });
  }

  async messageForwarderFrom(
    userId: Id,
    originalChat: Chat,
    targetChat: Chat,
    originalMessage: Message
  ) {
    originalChat.ensureCanPerformMessageAction(MessageAction.ForwardMessage);

    targetChat.ensureCanPerformMessageAction(MessageAction.SendMessage);

    targetChat.ensureCanSendContentType(originalMessage.contentType);

    const userCanForwardMessage =
      await this.permissionService.canUserForwardMessage(
        userId,
        originalChat.id(),
        targetChat.id()
      );

    if (!userCanForwardMessage) throw new Error("User cannot forward message");

    return new MessageForwarder({
      userId,
      chatId: originalChat.id(),
      targetChatId: targetChat.id(),
      messageId: originalMessage.id(),
      content: originalMessage.getContent(),
    });
  }

  async messageReacterFrom(userId: Id, chat: Chat, reaction: Reaction) {
    chat.ensureCanPerformMessageAction(MessageAction.ReactMessage);

    chat.ensureCanUseReaction(reaction);

    const userCanReactMessage =
      await this.permissionService.canUserReactMessage(userId, chat.id());

    if (!userCanReactMessage) throw new Error();

    return new MessageReacter({
      userId,
      chatId: chat.id(),
      reaction,
    });
  }

  async messageEditorFrom(userId: Id, chat: Chat) {
    chat.ensureCanPerformMessageAction(MessageAction.EditMessage);

    const userCanEditOwnMessage =
      await this.permissionService.canUserEditOwnMessage(userId, chat.id());

    if (!userCanEditOwnMessage) throw new Error();

    return new MessageEditor({ userId, chatId: chat.id() });
  }

  async chatActionPolicyManagerFrom(userId: Id, chat: Chat) {
    chat.ensureCanPerformChatAction(ChatAction.EditChatActionPolicy);

    const userCanEditChatActionPolicy =
      await this.permissionService.canUserEditChatActionPolicy(
        userId,
        chat.id()
      );

    if (!userCanEditChatActionPolicy) throw new Error();

    return new PolicyManager<ChatActionPolicy>({
      userId,
      chatId: chat.id(),
    });
  }

  async messageActionPolicyManagerFrom(userId: Id, chat: Chat) {
    chat.ensureCanPerformChatAction(ChatAction.EditMessageActionPolicy);

    const userCanEditMessageActionPolicy =
      await this.permissionService.canUserEditMessageActionPolicy(
        userId,
        chat.id()
      );

    if (!userCanEditMessageActionPolicy) throw new Error();

    return new PolicyManager<MessageActionPolicy>({
      userId,
      chatId: chat.id(),
    });
  }

  async messageContentPolicyManagerFrom(userId: Id, chat: Chat) {
    chat.ensureCanPerformChatAction(ChatAction.EditMessageContentPolicy);

    const userCanEditMessageContentPolicy =
      await this.permissionService.canUserEditMessageContentPolicy(
        userId,
        chat.id()
      );

    if (!userCanEditMessageContentPolicy) throw new Error();

    return new PolicyManager<MessageContentPolicy>({
      userId,
      chatId: chat.id(),
    });
  }

  async messageReactionPolicyManagerFrom(userId: Id, chat: Chat) {
    chat.ensureCanPerformChatAction(ChatAction.EditMessageReactionPolicy);

    const userCanEditMessageReactionPolicy =
      await this.permissionService.canUserEditMessageReactionPolicy(
        userId,
        chat.id()
      );

    if (!userCanEditMessageReactionPolicy) throw new Error();

    return new PolicyManager<MessageReactionPolicy>({
      userId,
      chatId: chat.id(),
    });
  }
}
