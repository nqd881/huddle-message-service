"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const ddd_node_1 = require("ddd-node");
const message_action_policy_1 = require("./policies/message-action-policy");
const message_content_policy_1 = require("./policies/message-content-policy");
const message_reaction_policy_1 = require("./policies/message-reaction-policy");
const chat_action_policy_1 = require("./policies/chat-action-policy");
const events_1 = require("./events");
class Chat extends ddd_node_1.StateAggregateBase {
    static create(id, props) {
        const builder = new ddd_node_1.StateAggregateBuilder(Chat);
        const chat = builder.withId(id).withProps(props).build();
        chat.recordEvent(events_1.ChatCreated, {
            chatId: id,
        });
        return chat;
    }
    canPerformMessageAction(action) {
        return this.messageActionPolicy.isActionAllowed(action);
    }
    ensureCanPerformMessageAction(action) {
        if (!this.canPerformMessageAction(action))
            throw new Error(`Message action "${action}" is not allowed in this chat`);
    }
    canSendContentType(contentType) {
        return this.messageContentPolicy.isContentTypeAllowed(contentType);
    }
    ensureCanSendContentType(contentType) {
        if (!this.canSendContentType(contentType))
            throw new Error(`Message content type "${contentType}" is not allowed in this chat`);
    }
    canUseReaction(reaction) {
        return this.messageReactionPolicy.isReactionAllowed(reaction);
    }
    ensureCanUseReaction(reaction) {
        if (!this.canUseReaction(reaction))
            throw new Error(`Reaction "${reaction.value}" is not allowed in this chat`);
    }
    canPerformChatAction(action) {
        return this.chatActionPolicy.isActionAllowed(action);
    }
    ensureCanPerformChatAction(action) {
        if (!this.canPerformChatAction(action))
            throw new Error(`Chat action "${action}" is not allowed in this chat`);
    }
    ensurePolicyUpdateIsValid(update) {
        if (update.chatId !== this.id())
            throw new Error("Invalid policy update");
    }
    updateChatActionPolicy(update) {
        this.ensurePolicyUpdateIsValid(update);
        const { chatId, updaterId, policy } = update;
        this._props.chatActionPolicy = policy;
        this.recordEvent(events_1.ChatActionPolicyUpdated, {
            chatId,
            updaterId,
        });
    }
    updateMessageActionPolicy(update) {
        this.ensurePolicyUpdateIsValid(update);
        const { chatId, updaterId, policy } = update;
        this._props.messageActionPolicy = policy;
        this.recordEvent(events_1.MessageActionPolicyUpdated, {
            chatId,
            updaterId,
        });
    }
    updateMessageContentPolicy(update) {
        this.ensurePolicyUpdateIsValid(update);
        const { chatId, updaterId, policy } = update;
        this._props.messageContentPolicy = policy;
        this.recordEvent(events_1.MessageContentPolicyUpdated, {
            chatId,
            updaterId,
        });
    }
    updateMessageReactionPolicy(update) {
        this.ensurePolicyUpdateIsValid(update);
        const { chatId, updaterId, policy } = update;
        this._props.messageReactionPolicy = policy;
        this.recordEvent(events_1.MessageReactionPolicyUpdated, {
            chatId,
            updaterId,
        });
    }
}
exports.Chat = Chat;
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", chat_action_policy_1.ChatActionPolicy)
], Chat.prototype, "chatActionPolicy", void 0);
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", message_action_policy_1.MessageActionPolicy)
], Chat.prototype, "messageActionPolicy", void 0);
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", message_content_policy_1.MessageContentPolicy)
], Chat.prototype, "messageContentPolicy", void 0);
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", message_reaction_policy_1.MessageReactionPolicy)
], Chat.prototype, "messageReactionPolicy", void 0);
