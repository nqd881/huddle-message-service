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
exports.Message = void 0;
const ddd_node_1 = require("ddd-node");
const events_1 = require("./events");
class Message extends ddd_node_1.StateAggregateBase {
    static create(props) {
        const messageBuilder = new ddd_node_1.StateAggregateBuilder(Message);
        const message = messageBuilder.withProps(props).build();
        message.recordEvent(events_1.MessageCreated, {
            chatId: message.chatId,
            messageId: message.id(),
            senderId: message.senderId,
        });
        return message;
    }
    get contentType() {
        return this._props.content.type;
    }
    isSentBy(userId) {
        return userId === this._props.senderId;
    }
    edit(update) {
        if (!this.editable)
            throw new Error("This message is uneditable");
        const { messageId, editorId, content } = update;
        if (messageId !== this.id())
            throw new Error("Invalid update (messageId)");
        if (this.isSentBy(editorId))
            throw new Error("Just only message sender can edit the message");
        if (content.type !== this.contentType)
            throw new Error("Cannot update message with different type of content");
        this._props.content = content;
        this._props.edited = true;
        this._props.editedAt = new Date();
        this.recordEvent(events_1.MessageEdited, {
            chatId: this.chatId,
            messageId: this.id(),
        });
    }
    getContent() {
        return this._props.content.clone();
    }
}
exports.Message = Message;
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", String)
], Message.prototype, "chatId", void 0);
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", String)
], Message.prototype, "senderId", void 0);
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", Object)
], Message.prototype, "content", void 0);
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", Boolean)
], Message.prototype, "editable", void 0);
