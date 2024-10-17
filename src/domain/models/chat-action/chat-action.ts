// import { Enum, EnumBase } from "ddd-node";

// export class ChatAction extends EnumBase {
//   @Enum()
//   static EditMessageContentPolicy: ChatAction;
// }

export enum ChatAction {
  EditChatActionPolicy = "edit_chat_action_policy",
  EditMessageActionPolicy = "edit_message_action_policy",
  EditMessageContentPolicy = "edit_message_content_policy",
  EditMessageReactionPolicy = "edit_message_reaction_policy",
}
