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
import { EditMessageCommand, EditMessageCommandPayload } from "./command";

@injectable()
@HandlerForCommand(EditMessageCommand)
export class EditMessageHandler extends AppCommandHandler<EditMessageCommand> {
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
    commandPayload: EditMessageCommandPayload
  ) {
    const { userId } = commandMetadata;
    const { chatId, messageId, contentText } = commandPayload;

    const content = new MessageContentText({ text: contentText });

    const updatedMessage = await this.domainServiceRegistry
      .messageService()
      .editMessage(userId, chatId, messageId, content);

    await this.repoRegistry.messageRepo().save(updatedMessage);

    return this.complete(messageId);
  }
}
