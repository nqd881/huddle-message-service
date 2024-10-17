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
import { MessageContentPolicy, MessageContentType } from "domain/models";
import { inject, injectable } from "inversify";
import { $enum } from "ts-enum-util";
import {
  EditMessageContentPolicyCommand,
  EditMessageContentPolicyCommandPayload,
} from "./command";

@injectable()
@HandlerForCommand(EditMessageContentPolicyCommand)
export class EditMessageContentPolicyHandler extends AppCommandHandler<EditMessageContentPolicyCommand> {
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
    commandPayload: EditMessageContentPolicyCommandPayload
  ) {
    const { userId } = commandMetadata;
    const { chatId, allowedContentTypes, restrictedContentTypes } =
      commandPayload;

    const newPolicy = new MessageContentPolicy({
      allowedTypes:
        allowedContentTypes?.map((value) =>
          $enum(MessageContentType).getValueOrThrow(value)
        ) ?? [],
      restrictedTypes:
        restrictedContentTypes?.map((value) =>
          $enum(MessageContentType).getValueOrThrow(value)
        ) ?? [],
    });

    const chat = await this.domainServiceRegistry
      .chatService()
      .editMessageContentPolicy(userId, chatId, newPolicy);

    await this.repoRegistry.chatRepo().save(chat);

    return this.complete(chatId);
  }
}
