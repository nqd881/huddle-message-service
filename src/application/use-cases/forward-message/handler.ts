import {
  AppCommandHandler,
  HandlerForCommand,
  IAppCommandMetadata,
} from "app-command";
import {
  IDomainServiceRegistry,
  IRepoRegistry,
} from "application/abstractions";
import {
  DomainServiceRegistryIdentifier,
  RepoRegistryIdentifier,
} from "application/app";
import { inject, injectable } from "inversify";
import { ForwardMessageCommand, ForwardMessageCommandPayload } from "./command";

@injectable()
@HandlerForCommand(ForwardMessageCommand)
export class ForwardMessageHandler extends AppCommandHandler<ForwardMessageCommand> {
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
    commandPayload: ForwardMessageCommandPayload
  ) {
    const { userId } = commandMetadata;
    const { originalChatId, originalMessageId, targetChatId } = commandPayload;

    const message = await this.domainServiceRegistry
      .messageService()
      .forwardMessasge(userId, originalChatId, originalMessageId, targetChatId);

    await this.repoRegistry.messageRepo().save(message);

    return this.complete(message.id());
  }
}
