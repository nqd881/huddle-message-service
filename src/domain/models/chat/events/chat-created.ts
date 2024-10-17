import { Event, EventBase, Id } from "ddd-node";

export interface ChatCreatedProps {
  chatId: Id;
}

@Event("chat_created")
export class ChatCreated extends EventBase<ChatCreatedProps> {}
