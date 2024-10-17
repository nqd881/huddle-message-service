import {
  IDomainServiceRegistry,
  IRepoRegistry,
} from "application/abstractions";
import {
  DomainServiceRegistryIdentifier,
  RepoRegistryIdentifier,
} from "application/app";
import {
  AppCommandHandler,
  HandlerForCommand,
  IAppCommandMetadata,
} from "app-command";
import { MessageAction, MessageActionPolicy } from "domain/models";
import { inject, injectable } from "inversify";
import {
  EditMessageActionPolicyCommand,
  EditMessageActionPolicyCommandPayload,
} from "./command";
import { $enum } from "ts-enum-util";

@injectable()
@HandlerForCommand(EditMessageActionPolicyCommand)
export class EditMessageActionPolicyHandler extends AppCommandHandler<EditMessageActionPolicyCommand> {
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
    commandPayload: EditMessageActionPolicyCommandPayload
  ) {
    const { userId } = commandMetadata;
    const { chatId, allowedActions, restrictedActions } = commandPayload;

    const newPolicy = new MessageActionPolicy({
      allowedActions:
        allowedActions?.map((value) =>
          $enum(MessageAction).getValueOrThrow(value)
        ) ?? [],
      restrictedActions:
        restrictedActions?.map((value) =>
          $enum(MessageAction).getValueOrThrow(value)
        ) ?? [],
    });

    const chat = await this.domainServiceRegistry
      .chatService()
      .editMessageActionPolicy(userId, chatId, newPolicy);

    await this.repoRegistry.chatRepo().save(chat);

    return this.complete(chatId);
  }
}
