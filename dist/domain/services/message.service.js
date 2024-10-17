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
exports.MessageService = void 0;
class MessageService {
    constructor(messageRepo, chatRepo, participantService) {
        this.messageRepo = messageRepo;
        this.chatRepo = chatRepo;
        this.participantService = participantService;
    }
    chatOfId(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.chatRepo.chatOfId(chatId);
            if (!chat)
                throw new Error(`Chat with id ${chatId} not found`);
            return chat;
        });
    }
    messageOfChat(chatId, messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.messageRepo.messageOfChat(chatId, messageId);
            if (!message)
                throw new Error(`Message with id ${messageId} not found in chat ${chatId}`);
            return message;
        });
    }
    sendMessage(userId, chatId, content, replyMessageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.chatOfId(chatId);
            const messageSender = yield this.participantService.messageSenderFrom(userId, chat, content);
            const message = messageSender.newMessage(replyMessageId);
            return message;
        });
    }
    forwardMessasge(userId, originalChatId, originalMessageId, targetChatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [originalChat, targetChat] = yield this.chatRepo.chatsOfIds([
                originalChatId,
                targetChatId,
            ]);
            if (!originalChat)
                throw new Error("Original chat not found");
            if (!targetChat)
                throw new Error("Target chat not found");
            const originalMessage = yield this.messageOfChat(originalChatId, originalMessageId);
            const messageForwarder = yield this.participantService.messageForwarderFrom(userId, originalChat, targetChat, originalMessage);
            const message = messageForwarder.newForwardMessage();
            return message;
        });
    }
    editMessage(userId, chatId, messageId, updatedContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.chatOfId(chatId);
            const messageEditor = yield this.participantService.messageEditorFrom(userId, chat);
            const message = yield this.messageOfChat(chatId, messageId);
            const update = messageEditor.newUpdate(message.id(), updatedContent);
            message.edit(update);
            return message;
        });
    }
    reactMessage(userId, chatId, messageId, reaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.chatOfId(chatId);
            const messageReacter = yield this.participantService.messageReacterFrom(userId, chat, reaction);
            const messageReaction = messageReacter.newMessageReaction(messageId);
            return messageReaction;
        });
    }
}
exports.MessageService = MessageService;
