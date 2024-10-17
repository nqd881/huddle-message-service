import { Id, Prop, ValueObjectBase } from "ddd-node";

export interface MessageForwardOriginProps {
  chatId: Id;
  messageId: Id;
  userId?: Id;
}

export class MessageForwardOrigin extends ValueObjectBase<MessageForwardOriginProps> {
  @Prop()
  declare chatId: Id;

  @Prop()
  declare messageId: Id;

  @Prop()
  declare userId?: Id;
}
