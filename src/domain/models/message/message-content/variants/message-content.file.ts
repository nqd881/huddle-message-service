import { Id, Model, Prop, PropsValidator } from "ddd-node";
import { MessageContent, MessageContentProps } from "../message-content";
import { MessageContentType } from "../message-content-type";

export interface MessageContentFileProps extends MessageContentProps {
  fileId: Id;
}

@Model({
  propsValidator: MessageContentFile.Validator,
})
export class MessageContentFile extends MessageContent<MessageContentFileProps> {
  static Validator: PropsValidator<MessageContentFile> = (props) => {
    if (props.type !== MessageContentType.File)
      throw new Error("Invalid content type");
  };

  @Prop()
  declare fileId: Id;
}
