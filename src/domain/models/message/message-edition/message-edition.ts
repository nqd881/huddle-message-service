import { Prop, ValueObjectBase } from "ddd-node";
import { MessageContentLike } from "../message-content";

export interface MessageEditionProps {
  content: MessageContentLike;
  editedAt: Date;
}

export class MessageEdition extends ValueObjectBase<MessageEditionProps> {
  @Prop()
  declare content: MessageContentLike;

  @Prop()
  declare editedAt: Date;
}
