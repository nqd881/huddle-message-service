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
exports.ChatService = void 0;
class ChatService {
    constructor(chatRepo, participantService) {
        this.chatRepo = chatRepo;
        this.participantService = participantService;
    }
    chat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.chatRepo.chatOfId(chatId);
            if (!chat)
                throw new Error(`Chat with id "${chatId}" not found`);
            return chat;
        });
    }
    editChatActionPolicy(userId, chatId, policy) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.chat(chatId);
            const policyManager = yield this.participantService.chatActionPolicyManagerFrom(userId, chat);
            const update = policyManager.newUpdate(policy);
            chat.updateChatActionPolicy(update);
            return chat;
        });
    }
    editMessageActionPolicy(userId, chatId, policy) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.chat(chatId);
            const policyManager = yield this.participantService.messageActionPolicyManagerFrom(userId, chat);
            const update = policyManager.newUpdate(policy);
            chat.updateMessageActionPolicy(update);
            return chat;
        });
    }
    editMessageContentPolicy(userId, chatId, policy) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.chat(chatId);
            const policyManager = yield this.participantService.messageContentPolicyManagerFrom(userId, chat);
            const update = policyManager.newUpdate(policy);
            chat.updateMessageContentPolicy(update);
            return chat;
        });
    }
    editMessageReactionPolicy(userId, chatId, policy) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.chat(chatId);
            const policyManager = yield this.participantService.messageReactionPolicyManagerFrom(userId, chat);
            const update = policyManager.newUpdate(policy);
            chat.updateMessageReactionPolicy(update);
            return chat;
        });
    }
}
exports.ChatService = ChatService;
