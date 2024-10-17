import { Model, Prop, PropsValidator } from "ddd-node";
import { MessageContent, MessageContentProps } from "../message-content";
import { MessageContentType } from "../message-content-type";

export interface MessageContentTextProps extends MessageContentProps {
  text: string;
}

@Model({
  propsValidator: MessageContentText.Validator,
})
export class MessageContentText extends MessageContent<MessageContentTextProps> {
  static Validator: PropsValidator<MessageContentText> = (props) => {
    if (props.type !== MessageContentType.Text)
      throw new Error("Invalid content type");
  };

  constructor(props: Omit<MessageContentTextProps, "type">) {
    super({
      type: MessageContentType.Text,
      text: props.text,
    });
  }

  @Prop()
  declare text: string;
}
