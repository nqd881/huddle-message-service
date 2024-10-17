"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantService = void 0;
const models_1 = require("../models");
class ParticipantService {
    constructor(permissionService) {
        this.permissionService = permissionService;
    }
    messageSenderFrom(userId, chat, content) {
        return __awaiter(this, void 0, void 0, function* () {
            chat.ensureCanPerformMessageAction(models_1.MessageAction.SendMessage);
            chat.ensureCanSendContentType(content.type);
            const userCanSendMessage = yield this.permissionService.canUserSendMessage(userId, chat.id());
            if (!userCanSendMessage)
                throw new Error("User cannot send message");
            return new models_1.MessageSender({
                userId,
                chatId: chat.id(),
                content,
            });
        });
    }
    messageForwarderFrom(userId, originalChat, targetChat, originalMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            originalChat.ensureCanPerformMessageAction(models_1.MessageAction.ForwardMessage);
            targetChat.ensureCanPerformMessageAction(models_1.MessageAction.SendMessage);
            targetChat.ensureCanSendContentType(originalMessage.contentType);
            const userCanForwardMessage = yield this.permissionService.canUserForwardMessage(userId, originalChat.id(), targetChat.id());
            if (!userCanForwardMessage)
                throw new Error("User cannot forward message");
            return new models_1.MessageForwarder({
                userId,
                chatId: originalChat.id(),
                targetChatId: targetChat.id(),
                messageId: originalMessage.id(),
                content: originalMessage.getContent(),
            });
        });
    }
    messageReacterFrom(userId, chat, reaction) {
        return __awaiter(this, void 0, void 0, function* () {
            chat.ensureCanPerformMessageAction(models_1.MessageAction.ReactMessage);
            chat.ensureCanUseReaction(reaction);
            const userCanReactMessage = yield this.permissionService.canUserReactMessage(userId, chat.id());
            if (!userCanReactMessage)
                throw new Error();
            return new models_1.MessageReacter({
                userId,
                chatId: chat.id(),
                reaction,
            });
        });
    }
    messageEditorFrom(userId, chat) {
        return __awaiter(this, void 0, void 0, function* () {
            chat.ensureCanPerformMessageAction(models_1.MessageAction.EditMessage);
            const userCanEditOwnMessage = yield this.permissionService.canUserEditOwnMessage(userId, chat.id());
            if (!userCanEditOwnMessage)
                throw new Error();
            return new models_1.MessageEditor({ userId, chatId: chat.id() });
        });
    }
    chatActionPolicyManagerFrom(userId, chat) {
        return __awaiter(this, void 0, void 0, function* () {
            chat.ensureCanPerformChatAction(models_1.ChatAction.EditChatActionPolicy);
            const userCanEditChatActionPolicy = yield this.permissionService.canUserEditChatActionPolicy(userId, chat.id());
            if (!userCanEditChatActionPolicy)
                throw new Error();
            return new models_1.PolicyManager({
                userId,
                chatId: chat.id(),
            });
        });
    }
    messageActionPolicyManagerFrom(userId, chat) {
        return __awaiter(this, void 0, void 0, function* () {
            chat.ensureCanPerformChatAction(models_1.ChatAction.EditMessageActionPolicy);
            const userCanEditMessageActionPolicy = yield this.permissionService.canUserEditMessageActionPolicy(userId, chat.id());
            if (!userCanEditMessageActionPolicy)
                throw new Error();
            return new models_1.PolicyManager({
                userId,
                chatId: chat.id(),
            });
        });
    }
    messageContentPolicyManagerFrom(userId, chat) {
        return __awaiter(this, void 0, void 0, function* () {
            chat.ensureCanPerformChatAction(models_1.ChatAction.EditMessageContentPolicy);
            const userCanEditMessageContentPolicy = yield this.permissionService.canUserEditMessageContentPolicy(userId, chat.id());
            if (!userCanEditMessageContentPolicy)
                throw new Error();
            return new models_1.PolicyManager({
                userId,
                chatId: chat.id(),
            });
        });
    }
    messageReactionPolicyManagerFrom(userId, chat) {
        return __awaiter(this, void 0, void 0, function* () {
            chat.ensureCanPerformChatAction(models_1.ChatAction.EditMessageReactionPolicy);
            const userCanEditMessageReactionPolicy = yield this.permissionService.canUserEditMessageReactionPolicy(userId, chat.id());
            if (!userCanEditMessageReactionPolicy)
                throw new Error();
            return new models_1.PolicyManager({
                userId,
                chatId: chat.id(),
            });
        });
    }
}
exports.ParticipantService = ParticipantService;
