import { Id, Model, Prop, PropsValidator } from "ddd-node";
import { MessageContent, MessageContentProps } from "../message-content";
import { MessageContentType } from "../message-content-type";

export interface MessageContentVideoProps extends MessageContentProps {
  videoId: Id;
}

@Model({
  propsValidator: MessageContentVideo.Validator,
})
export class MessageContentVideo extends MessageContent<MessageContentVideoProps> {
  static Validator: PropsValidator<MessageContentVideo> = (props) => {
    if (props.type !== MessageContentType.Video)
      throw new Error("Invalid content type");
  };

  @Prop()
  declare videoId: Id;
}
