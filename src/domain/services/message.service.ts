import { Id } from "ddd-node";
import { MessageContentLike, Reaction } from "domain/models";
import { IChatRepo, IMessageRepo } from "domain/repositories";
import { ParticipantService } from "./participant.service";

export class MessageService {
  constructor(
    private messageRepo: IMessageRepo,
    private chatRepo: IChatRepo,
    private participantService: ParticipantService
  ) {}

  private async chatOfId(chatId: Id) {
    const chat = await this.chatRepo.chatOfId(chatId);

    if (!chat) throw new Error(`Chat with id ${chatId} not found`);

    return chat;
  }

  private async messageOfChat(chatId: Id, messageId: Id) {
    const message = await this.messageRepo.messageOfChat(chatId, messageId);

    if (!message)
      throw new Error(
        `Message with id ${messageId} not found in chat ${chatId}`
      );

    return message;
  }

  async sendMessage(
    userId: Id,
    chatId: Id,
    content: MessageContentLike,
    replyMessageId?: Id
  ) {
    const chat = await this.chatOfId(chatId);

    const messageSender = await this.participantService.messageSenderFrom(
      userId,
      chat,
      content
    );

    const message = messageSender.newMessage(replyMessageId);

    return message;
  }

  async forwardMessasge(
    userId: Id,
    originalChatId: Id,
    originalMessageId: Id,
    targetChatId: Id
  ) {
    const [originalChat, targetChat] = await this.chatRepo.chatsOfIds([
      originalChatId,
      targetChatId,
    ]);

    if (!originalChat) throw new Error("Original chat not found");
    if (!targetChat) throw new Error("Target chat not found");

    const originalMessage = await this.messageOfChat(
      originalChatId,
      originalMessageId
    );

    const messageForwarder = await this.participantService.messageForwarderFrom(
      userId,
      originalChat,
      targetChat,
      originalMessage
    );

    const message = messageForwarder.newForwardMessage();

    return message;
  }

  async editMessage(
    userId: Id,
    chatId: Id,
    messageId: Id,
    updatedContent: MessageContentLike
  ) {
    const chat = await this.chatOfId(chatId);

    const messageEditor = await this.participantService.messageEditorFrom(
      userId,
      chat
    );

    const message = await this.messageOfChat(chatId, messageId);

    const update = messageEditor.newUpdate(message.id(), updatedContent);

    message.edit(update);

    return message;
  }

  async reactMessage(
    userId: Id,
    chatId: Id,
    messageId: Id,
    reaction: Reaction
  ) {
    const chat = await this.chatOfId(chatId);

    const messageReacter = await this.participantService.messageReacterFrom(
      userId,
      chat,
      reaction
    );

    const messageReaction = messageReacter.newMessageReaction(messageId);

    return messageReaction;
  }
}
