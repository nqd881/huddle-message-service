import { Id } from "ddd-node";
import { ParticipantService } from "./participant.service";
import {
  ChatActionPolicy,
  MessageActionPolicy,
  MessageContentPolicy,
  MessageReactionPolicy,
} from "domain/models";
import { IChatRepo } from "domain/repositories";

export class ChatService {
  constructor(
    private chatRepo: IChatRepo,
    private participantService: ParticipantService
  ) {}

  private async chat(chatId: Id) {
    const chat = await this.chatRepo.chatOfId(chatId);

    if (!chat) throw new Error(`Chat with id "${chatId}" not found`);

    return chat;
  }

  async editChatActionPolicy(userId: Id, chatId: Id, policy: ChatActionPolicy) {
    const chat = await this.chat(chatId);

    const policyManager =
      await this.participantService.chatActionPolicyManagerFrom(userId, chat);

    const update = policyManager.newUpdate(policy);

    chat.updateChatActionPolicy(update);

    return chat;
  }

  async editMessageActionPolicy(
    userId: Id,
    chatId: Id,
    policy: MessageActionPolicy
  ) {
    const chat = await this.chat(chatId);

    const policyManager =
      await this.participantService.messageActionPolicyManagerFrom(
        userId,
        chat
      );

    const update = policyManager.newUpdate(policy);

    chat.updateMessageActionPolicy(update);

    return chat;
  }

  async editMessageContentPolicy(
    userId: Id,
    chatId: Id,
    policy: MessageContentPolicy
  ) {
    const chat = await this.chat(chatId);

    const policyManager =
      await this.participantService.messageContentPolicyManagerFrom(
        userId,
        chat
      );

    const update = policyManager.newUpdate(policy);

    chat.updateMessageContentPolicy(update);

    return chat;
  }

  async editMessageReactionPolicy(
    userId: Id,
    chatId: Id,
    policy: MessageReactionPolicy
  ) {
    const chat = await this.chat(chatId);

    const policyManager =
      await this.participantService.messageReactionPolicyManagerFrom(
        userId,
        chat
      );

    const update = policyManager.newUpdate(policy);

    chat.updateMessageReactionPolicy(update);

    return chat;
  }
}
