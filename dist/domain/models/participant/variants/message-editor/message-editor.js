"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEditor = void 0;
const message_1 = require("../../../message");
const participant_1 = require("../..");
class MessageEditor extends participant_1.Participant {
    newUpdate(messageId, content) {
        return new message_1.MessageUpdate({
            messageId,
            content,
            editorId: this.userId,
        });
    }
}
exports.MessageEditor = MessageEditor;
