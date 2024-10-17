import { Id, Model, Prop, PropsValidator } from "ddd-node";
import { MessageContent, MessageContentProps } from "../message-content";
import { MessageContentType } from "../message-content-type";

export interface MessageContentPhotoProps extends MessageContentProps {
  photoId: Id;
}

@Model({
  propsValidator: MessageContentPhoto.Validator,
})
export class MessageContentPhoto extends MessageContent<MessageContentPhotoProps> {
  static Validator: PropsValidator<MessageContentPhoto> = (props) => {
    if (props.type !== MessageContentType.Photo)
      throw new Error("Invalid content type");
  };

  @Prop()
  declare photoId: Id;
}
