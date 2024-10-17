import { Prop, ValueObjectBase } from "ddd-node";
import { MessageContentType } from "./message-content-type";

export interface MessageContentProps {
  type: MessageContentType;
}

export class MessageContent<
  P extends MessageContentProps
> extends ValueObjectBase<P> {
  @Prop()
  declare type: MessageContentType;
}
