import { IAppCommand, IAppCommandBus } from "app-command";
import {
  IDomainServiceRegistry,
  IRepoRegistry,
} from "application/abstractions";
import { CreateChatHandler } from "application/use-cases/create-chat";
import { EditChatActionPolicyHandler } from "application/use-cases/edit-chat-action-policy";
import { EditMessageHandler } from "application/use-cases/edit-message";
import { EditMessageActionPolicyHandler } from "application/use-cases/edit-message-action-policy";
import { EditMessageContentPolicyHandler } from "application/use-cases/edit-message-content-policy";
import { EditMessageReactionPolicyHandler } from "application/use-cases/edit-message-reaction-policy";
import { ForwardMessageHandler } from "application/use-cases/forward-message";
import { ReactMessageHandler } from "application/use-cases/react-message";
import { SendMessageHandler } from "application/use-cases/send-message";
import { Container } from "inversify";
import {
  AppCommandBusIdentifier,
  DomainServiceRegistryIdentifier,
  RepoRegistryIdentifier,
} from "./app.identifier";
import { AppCommandBusModule } from "./modules/app-command-bus";

export class App extends Container {
  constructor(
    repoRegistry: IRepoRegistry,
    domainServiceRegistry: IDomainServiceRegistry
  ) {
    super({});

    this.bindRepoRegistry(repoRegistry);
    this.bindDomainServiceRegistry(domainServiceRegistry);

    this.loadAppCommandBusModule();
  }

  bindRepoRegistry(repoRegistry: IRepoRegistry) {
    this.bind(RepoRegistryIdentifier).toConstantValue(repoRegistry);
  }

  bindDomainServiceRegistry(domainServiceRegistry: IDomainServiceRegistry) {
    this.bind(DomainServiceRegistryIdentifier).toConstantValue(
      domainServiceRegistry
    );
  }

  loadAppCommandBusModule() {
    const module = new AppCommandBusModule({
      identifier: AppCommandBusIdentifier,
      commandHandlers: [
        CreateChatHandler,
        EditChatActionPolicyHandler,
        EditMessageActionPolicyHandler,
        EditMessageContentPolicyHandler,
        EditMessageReactionPolicyHandler,
        SendMessageHandler,
        ForwardMessageHandler,
        ReactMessageHandler,
        EditMessageHandler,
      ],
    });

    this.load(module);
  }

  commandBus() {
    return this.get<IAppCommandBus>(AppCommandBusIdentifier);
  }

  executeCommand(command: IAppCommand) {
    return this.commandBus().executeCommand(command);
  }
}
