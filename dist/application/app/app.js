"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const create_chat_1 = require("../use-cases/create-chat");
const edit_chat_action_policy_1 = require("../use-cases/edit-chat-action-policy");
const edit_message_1 = require("../use-cases/edit-message");
const edit_message_action_policy_1 = require("../use-cases/edit-message-action-policy");
const edit_message_content_policy_1 = require("../use-cases/edit-message-content-policy");
const edit_message_reaction_policy_1 = require("../use-cases/edit-message-reaction-policy");
const forward_message_1 = require("../use-cases/forward-message");
const react_message_1 = require("../use-cases/react-message");
const send_message_1 = require("../use-cases/send-message");
const inversify_1 = require("inversify");
const app_identifier_1 = require("./app.identifier");
const app_command_bus_1 = require("./modules/app-command-bus");
class App extends inversify_1.Container {
    constructor(repoRegistry, domainServiceRegistry) {
        super({});
        this.bindRepoRegistry(repoRegistry);
        this.bindDomainServiceRegistry(domainServiceRegistry);
        this.loadAppCommandBusModule();
    }
    bindRepoRegistry(repoRegistry) {
        this.bind(app_identifier_1.RepoRegistryIdentifier).toConstantValue(repoRegistry);
    }
    bindDomainServiceRegistry(domainServiceRegistry) {
        this.bind(app_identifier_1.DomainServiceRegistryIdentifier).toConstantValue(domainServiceRegistry);
    }
    loadAppCommandBusModule() {
        const module = new app_command_bus_1.AppCommandBusModule({
            identifier: app_identifier_1.AppCommandBusIdentifier,
            commandHandlers: [
                create_chat_1.CreateChatHandler,
                edit_chat_action_policy_1.EditChatActionPolicyHandler,
                edit_message_action_policy_1.EditMessageActionPolicyHandler,
                edit_message_content_policy_1.EditMessageContentPolicyHandler,
                edit_message_reaction_policy_1.EditMessageReactionPolicyHandler,
                send_message_1.SendMessageHandler,
                forward_message_1.ForwardMessageHandler,
                react_message_1.ReactMessageHandler,
                edit_message_1.EditMessageHandler,
            ],
        });
        this.load(module);
    }
    commandBus() {
        return this.get(app_identifier_1.AppCommandBusIdentifier);
    }
    executeCommand(command) {
        return this.commandBus().executeCommand(command);
    }
}
exports.App = App;
