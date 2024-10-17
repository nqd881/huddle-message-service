import { ChatActionPolicy } from "./chat-action-policy";
import { MessageActionPolicy } from "./message-action-policy";
import { MessageContentPolicy } from "./message-content-policy";
import { MessageReactionPolicy } from "./message-reaction-policy";

export type ChatPolicyLike =
  | ChatActionPolicy
  | MessageActionPolicy
  | MessageContentPolicy
  | MessageReactionPolicy;

export * from "./chat-action-policy";
export * from "./message-action-policy";
export * from "./message-content-policy";
export * from "./message-reaction-policy";
