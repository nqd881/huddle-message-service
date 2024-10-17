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
import { MessageReactionPolicy, Reaction } from "domain/models";
import { inject, injectable } from "inversify";
import {
  EditMessageReactionPolicyCommand,
  EditMessageReactionPolicyCommandPayload,
} from "./command";

@injectable()
@HandlerForCommand(EditMessageReactionPolicyCommand)
export class EditMessageReactionPolicyHandler extends AppCommandHandler<EditMessageReactionPolicyCommand> {
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
    commandPayload: EditMessageReactionPolicyCommandPayload
  ) {
    const { userId } = commandMetadata;
    const { chatId, allowedReactions, restrictedReactions } = commandPayload;

    const newPolicy = new MessageReactionPolicy({
      allowedReactions:
        allowedReactions?.map((value) => new Reaction({ value })) ?? [],
      restrictedReactions:
        restrictedReactions?.map((value) => new Reaction({ value })) ?? [],
    });

    const chat = await this.domainServiceRegistry
      .chatService()
      .editMessageReactionPolicy(userId, chatId, newPolicy);

    await this.repoRegistry.chatRepo().save(chat);

    return this.complete(chatId);
  }
}
