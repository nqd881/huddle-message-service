import { Model, Prop, PropsValidator, ValueObjectBase } from "ddd-node";
import { uniq } from "lodash";
import { MessageContentType } from "../../../message/message-content";

export interface MessageContentPolicyProps {
  allowedTypes: MessageContentType[];
  restrictedTypes: MessageContentType[];
}

@Model({
  propsValidator: MessageContentPolicy.Validator,
})
export class MessageContentPolicy extends ValueObjectBase<MessageContentPolicyProps> {
  static Validator: PropsValidator<MessageContentPolicy> = (props) => {
    const { allowedTypes, restrictedTypes } = props;

    const hasConflict = allowedTypes.some((typeX) =>
      restrictedTypes.includes(typeX)
    );

    if (hasConflict)
      throw new Error("Allowed types has conflict with restricted types");
  };

  constructor(props: MessageContentPolicyProps) {
    super({
      allowedTypes: uniq(props.allowedTypes),
      restrictedTypes: uniq(props.restrictedTypes),
    });
  }

  @Prop()
  private declare allowedTypes: MessageContentType[];

  @Prop()
  private declare restrictedTypes: MessageContentType[];

  isContentTypeAllowed(contentType: MessageContentType) {
    return (
      this.allowedTypes.some((allowedType) => allowedType === contentType) ||
      this.restrictedTypes.every(
        (restrictedType) => restrictedType !== contentType
      )
    );
  }
}
