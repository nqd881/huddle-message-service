import { Id, Prop, ValueObjectBase } from "ddd-node";
import { MessageContentLike } from "./types";

export interface MessageUpdateProps {
  messageId: Id;
  editorId: Id;
  content: MessageContentLike;
}

export class MessageUpdate extends ValueObjectBase<MessageUpdateProps> {
  @Prop()
  declare messageId: Id;

  @Prop()
  declare editorId: Id;

  @Prop()
  declare content: MessageContentLike;
}
