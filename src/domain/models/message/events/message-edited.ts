import { Event, EventBase, Id } from "ddd-node";

export interface MessageEditedProps {
  chatId: Id;
  messageId: Id;
}

@Event("message_edited")
export class MessageEdited extends EventBase<MessageEditedProps> {}
