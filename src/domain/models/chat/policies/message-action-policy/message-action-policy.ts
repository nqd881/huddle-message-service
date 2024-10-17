import { Model, Prop, PropsValidator, ValueObjectBase } from "ddd-node";
import { uniq } from "lodash";
import { MessageAction } from "../../../message-action/message-action";

export interface MessageActionPolicyProps {
  allowedActions: MessageAction[];
  restrictedActions: MessageAction[];
}

@Model({
  propsValidator: MessageActionPolicy.Validator,
})
export class MessageActionPolicy extends ValueObjectBase<MessageActionPolicyProps> {
  static Validator: PropsValidator<MessageActionPolicy> = (props) => {
    const { allowedActions, restrictedActions } = props;

    const hasConflict = allowedActions.some((actionX) =>
      restrictedActions.includes(actionX)
    );

    if (hasConflict)
      throw new Error("Allowed-actions has conflict with restricted-actions");
  };

  constructor(props: MessageActionPolicyProps) {
    super({
      allowedActions: uniq(props.allowedActions),
      restrictedActions: uniq(props.restrictedActions),
    });
  }

  @Prop()
  private declare allowedActions: MessageAction[];

  @Prop()
  private declare restrictedActions: MessageAction[];

  isActionAllowed(action: MessageAction) {
    return (
      this.allowedActions.some((allowedAction) => allowedAction === action) ||
      this.restrictedActions.every(
        (restrictedAction) => restrictedAction !== action
      )
    );
  }
}
