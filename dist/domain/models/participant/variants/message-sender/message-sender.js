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
exports.MessageSender = void 0;
const ddd_node_1 = require("ddd-node");
const message_1 = require("../../../message");
const participant_1 = require("../..");
class MessageSender extends participant_1.Participant {
    newMessage(replyMessageId) {
        const message = message_1.Message.create({
            chatId: this.chatId,
            senderId: this.userId,
            content: this.content,
            sentAt: new Date(),
            editable: true,
            edited: false,
            replyMessageId,
        });
        return message;
    }
}
exports.MessageSender = MessageSender;
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", Object)
], MessageSender.prototype, "content", void 0);
