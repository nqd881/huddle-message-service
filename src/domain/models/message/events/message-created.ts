import { Event, EventBase, Id } from "ddd-node";

export interface MessageCreatedProps {
  chatId: Id;
  messageId: Id;
  senderId: Id;
}

@Event("message_created")
export class MessageCreated extends EventBase<MessageCreatedProps> {}
