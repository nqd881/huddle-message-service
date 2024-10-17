// import { Enum, EnumBase } from "ddd-node";

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

export enum MessageAction {
  SendMessage = "send_message",
  ForwardMessage = "forward_message",
  ReactMessage = "react_message",
  EditMessage = "edit_message",
}
