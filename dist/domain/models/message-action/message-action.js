"use strict";
// import { Enum, EnumBase } from "ddd-node";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageAction = void 0;
// export class MessageActionX extends EnumBase {
//   @Enum("send_message")
//   static SendMessage: MessageActionX;
//   @Enum("forward_message")
//   static ForwardMessage: MessageActionX;
//   @Enum("react_message")
//   static ReactMessage: MessageActionX;
//   @Enum("edit_message")
//   static EditMessage: MessageActionX;
// }
var MessageAction;
(function (MessageAction) {
    MessageAction["SendMessage"] = "send_message";
    MessageAction["ForwardMessage"] = "forward_message";
    MessageAction["ReactMessage"] = "react_message";
    MessageAction["EditMessage"] = "edit_message";
})(MessageAction || (exports.MessageAction = MessageAction = {}));
