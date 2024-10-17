import { IRepoRegistry } from "application/abstractions";
import { RepoRegistryIdentifier } from "application/app";
import {
  AppCommandHandler,
  HandlerForCommand,
  IAppCommandMetadata,
} from "app-command";
import {
  Chat,
  ChatAction,
  ChatActionPolicy,
  MessageAction,
  MessageActionPolicy,
  MessageContentPolicy,
  MessageContentType,
  MessageReactionPolicy,
  Reaction,
} from "domain/models";
import { inject, injectable } from "inversify";
import { CreateChatCommand, CreateChatCommandPayload } from "./command";
import { $enum } from "ts-enum-util";

@injectable()
@HandlerForCommand(CreateChatCommand)
export class CreateChatHandler extends AppCommandHandler<CreateChatCommand> {
  constructor(
    @inject(RepoRegistryIdentifier) private repoRegistry: IRepoRegistry
  ) {
    super();
  }

  async handle(
    commandId: string,
    commandMetadata: IAppCommandMetadata,
    commandPayload: CreateChatCommandPayload
  ): Promise<unknown> {
    const { userId } = commandMetadata;
    const {
      chatId,
      chatActionPolicy: chatActionPolicyPayload,
      messageActionPolicy: messageActionPolicyPayload,
      messageContentPolicy: messageContentPolicyPayload,
      messageReactionPolicy: messageReactionPolicyPayload,
    } = commandPayload;

    const chatActionPolicy = new ChatActionPolicy({
      allowedActions:
        chatActionPolicyPayload?.allowed?.map((value) =>
          $enum(ChatAction).getValueOrThrow(value)
        ) ?? [],
      restrictedActions:
        chatActionPolicyPayload?.restricted?.map((value) =>
          $enum(ChatAction).getValueOrThrow(value)
        ) ?? [],
    });

    const messageActionPolicy = new MessageActionPolicy({
      allowedActions:
        messageActionPolicyPayload?.allowed?.map((value) =>
          $enum(MessageAction).getValueOrThrow(value)
        ) ?? [],
      restrictedActions:
        messageActionPolicyPayload?.restricted?.map((value) =>
          $enum(MessageAction).getValueOrThrow(value)
        ) ?? [],
    });

    const messageContentPolicy = new MessageContentPolicy({
      allowedTypes:
        messageContentPolicyPayload?.allowed?.map((value) =>
          $enum(MessageContentType).getValueOrThrow(value)
        ) ?? [],
      restrictedTypes:
        messageContentPolicyPayload?.restricted?.map((value) =>
          $enum(MessageContentType).getValueOrThrow(value)
        ) ?? [],
    });

    const messageReactionPolicy = new MessageReactionPolicy({
      allowedReactions:
        messageReactionPolicyPayload?.allowed?.map(
          (value) => new Reaction({ value })
        ) ?? [],
      restrictedReactions:
        messageReactionPolicyPayload?.restricted?.map(
          (value) => new Reaction({ value })
        ) ?? [],
    });

    const chat = Chat.create(chatId, {
      chatActionPolicy,
      messageActionPolicy,
      messageContentPolicy,
      messageReactionPolicy,
    });

    await this.repoRegistry.chatRepo().save(chat);

    return this.complete(chatId);
  }
}
