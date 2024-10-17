import { Event, EventBase, Id } from "ddd-node";

export interface MessageReactedProps {
  messageReactionId: Id;
  chatId: Id;
  messageId: Id;
  senderId: Id;
  reactionValue: string;
}

@Event("message_reacted")
export class MessageReacted extends EventBase<MessageReactedProps> {}
