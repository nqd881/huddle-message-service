import {
  AppCommandBus,
  AppCommandHandler,
  AppCommandHandlerClass,
} from "app-command";
import { ModuleX } from "application/utils/inversify/module";
import { decorate, injectable } from "inversify";

export interface AppCommandBusModuleOptions {
  identifier: string | symbol;
  commandHandlers: AppCommandHandlerClass[];
}

export class AppCommandBusModule extends ModuleX {
  private commandBus = new AppCommandBus();

  constructor(private options: AppCommandBusModuleOptions) {
    super();

    decorate(injectable(), AppCommandHandler);
  }

  init() {
    this.bindCommandHandlers();
    this.bindCommandBus();
  }

  bindCommandHandlers() {
    const { commandHandlers } = this.options;

    commandHandlers.forEach((commandHandler) => {
      this.bind(commandHandler).toSelf().inRequestScope();
    });
  }

  bindCommandBus() {
    const { identifier, commandHandlers } = this.options;

    this.onActivation<AppCommandBus>(identifier, (context, instance) => {
      commandHandlers.forEach((commandHandler) => {
        const commandType = commandHandler.commandType();

        if (!commandType)
          throw new Error("You must define command type for handler");

        instance.registerHandler(commandType, () =>
          context.container.get<AppCommandHandler>(commandHandler)
        );
      });

      return instance;
    });

    this.bind(identifier).toConstantValue(this.commandBus);
  }
}
