"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCommandBusModule = void 0;
const app_command_1 = require("app-command");
const module_1 = require("../../../utils/inversify/module");
const inversify_1 = require("inversify");
class AppCommandBusModule extends module_1.ModuleX {
    constructor(options) {
        super();
        this.options = options;
        this.commandBus = new app_command_1.AppCommandBus();
        (0, inversify_1.decorate)((0, inversify_1.injectable)(), app_command_1.AppCommandHandler);
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
        this.onActivation(identifier, (context, instance) => {
            commandHandlers.forEach((commandHandler) => {
                const commandType = commandHandler.commandType();
                if (!commandType)
                    throw new Error("You must define command type for handler");
                instance.registerHandler(commandType, () => context.container.get(commandHandler));
            });
            return instance;
        });
        this.bind(identifier).toConstantValue(this.commandBus);
    }
}
exports.AppCommandBusModule = AppCommandBusModule;
