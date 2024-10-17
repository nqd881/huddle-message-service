"use strict";
// import { Enum, EnumBase } from "ddd-node";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatAction = void 0;
// export class ChatAction extends EnumBase {
//   @Enum()
//   static EditMessageContentPolicy: ChatAction;
// }
var ChatAction;
(function (ChatAction) {
    ChatAction["EditChatActionPolicy"] = "edit_chat_action_policy";
    ChatAction["EditMessageActionPolicy"] = "edit_message_action_policy";
    ChatAction["EditMessageContentPolicy"] = "edit_message_content_policy";
    ChatAction["EditMessageReactionPolicy"] = "edit_message_reaction_policy";
})(ChatAction || (exports.ChatAction = ChatAction = {}));
