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
exports.MessageReaction = void 0;
const ddd_node_1 = require("ddd-node");
const reaction_1 = require("../reaction");
const events_1 = require("./events");
class MessageReaction extends ddd_node_1.StateAggregateBase {
    static create(props) {
        const builder = new ddd_node_1.StateAggregateBuilder(MessageReaction);
        const messageReaction = builder.withProps(props).build();
        messageReaction.recordEvent(events_1.MessageReacted, {
            messageReactionId: messageReaction.id(),
            chatId: messageReaction.chatId,
            messageId: messageReaction.messageId,
            senderId: messageReaction.senderId,
            reactionValue: messageReaction.reaction.value,
        });
        return messageReaction;
    }
}
exports.MessageReaction = MessageReaction;
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", String)
], MessageReaction.prototype, "chatId", void 0);
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", String)
], MessageReaction.prototype, "messageId", void 0);
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", String)
], MessageReaction.prototype, "senderId", void 0);
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", reaction_1.Reaction)
], MessageReaction.prototype, "reaction", void 0);
