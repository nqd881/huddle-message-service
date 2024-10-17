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
import { MessageContentText } from "domain/models";
import { inject, injectable } from "inversify";
import { SendMessageCommand, SendMessageCommandPayload } from "./command";

@injectable()
@HandlerForCommand(SendMessageCommand)
export class SendMessageHandler extends AppCommandHandler<SendMessageCommand> {
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
    commandPayload: SendMessageCommandPayload
  ) {
    const { userId } = commandMetadata;
    const { chatId, replyMessageId, contentText } = commandPayload;

    const content = new MessageContentText({ text: contentText });

    const message = await this.domainServiceRegistry
      .messageService()
      .sendMessage(userId, chatId, content, replyMessageId);

    await this.repoRegistry.messageRepo().save(message);

    return this.complete(message.id());
  }
}
