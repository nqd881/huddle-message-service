import {
  AppCommandHandler,
  HandlerForCommand,
  IAppCommandMetadata,
} from "app-command";
import {
  EditChatActionPolicyCommand,
  EditChatActionPolicyCommandPayload,
} from "./command";
import { inject, injectable } from "inversify";
import {
  IDomainServiceRegistry,
  IRepoRegistry,
} from "application/abstractions";
import {
  DomainServiceRegistryIdentifier,
  RepoRegistryIdentifier,
} from "application/app";
import { ChatAction, ChatActionPolicy } from "domain/models";
import { $enum } from "ts-enum-util";

@injectable()
@HandlerForCommand(EditChatActionPolicyCommand)
export class EditChatActionPolicyHandler extends AppCommandHandler<EditChatActionPolicyCommand> {
  constructor(
    @inject(RepoRegistryIdentifier) private repoRegistry: IRepoRegistry,
    @inject(DomainServiceRegistryIdentifier)
    private domainServiceRegistry: IDomainServiceRegistry
  ) {
    super();
  }

  async handle(
    commandId: string,
    commandMetadata: IAppCommandMetadata,
    commandPayload: EditChatActionPolicyCommandPayload
  ): Promise<unknown> {
    const { userId } = commandMetadata;
    const { chatId, allowedActions, restrictedActions } = commandPayload;

    const newPolicy = new ChatActionPolicy({
      allowedActions:
        allowedActions?.map((value) =>
          $enum(ChatAction).getValueOrThrow(value)
        ) ?? [],
      restrictedActions:
        restrictedActions?.map((value) =>
          $enum(ChatAction).getValueOrThrow(value)
        ) ?? [],
    });

    const chat = await this.domainServiceRegistry
      .chatService()
      .editChatActionPolicy(userId, chatId, newPolicy);

    await this.repoRegistry.chatRepo().save(chat);

    return this.complete(chatId);
  }
}
