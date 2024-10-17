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
import { Reaction } from "domain/models";
import { inject, injectable } from "inversify";
import { ReactMessageCommand, ReactMessageCommandPayload } from "./command";

@injectable()
@HandlerForCommand(ReactMessageCommand)
export class ReactMessageHandler extends AppCommandHandler<ReactMessageCommand> {
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
    commandPayload: ReactMessageCommandPayload
  ) {
    const { userId } = commandMetadata;
    const { chatId, messageId, reaction: reactionValue } = commandPayload;

    const reaction = new Reaction({ value: reactionValue });

    const messageReaction = await this.domainServiceRegistry
      .messageService()
      .reactMessage(userId, chatId, messageId, reaction);

    await this.repoRegistry.messageReactionRepo().save(messageReaction);

    return this.complete(messageReaction.id());
  }
}
