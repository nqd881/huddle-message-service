import { Model, Prop, PropsValidator, ValueObjectBase } from "ddd-node";
import { uniq } from "lodash";
import { ChatAction } from "../../../chat-action/chat-action";

export interface ChatActionPolicyProps {
  allowedActions: ChatAction[];
  restrictedActions: ChatAction[];
}

@Model({
  propsValidator: ChatActionPolicy.Validator,
})
export class ChatActionPolicy extends ValueObjectBase<ChatActionPolicyProps> {
  static Validator: PropsValidator<ChatActionPolicy> = (props) => {
    const { allowedActions, restrictedActions } = props;

    const hasConflict = allowedActions.some((actionX) =>
      restrictedActions.includes(actionX)
    );

    if (hasConflict)
      throw new Error("Allowed-actions has conflict with restricted-actions");
  };

  constructor(props: ChatActionPolicyProps) {
    super({
      allowedActions: uniq(props.allowedActions),
      restrictedActions: uniq(props.restrictedActions),
    });
  }

  @Prop()
  private declare allowedActions: ChatAction[];

  @Prop()
  private declare restrictedActions: ChatAction[];

  isActionAllowed(action: ChatAction) {
    return (
      this.allowedActions.some((allowedAction) => allowedAction === action) ||
      this.restrictedActions.every(
        (restrictedAction) => restrictedAction !== action
      )
    );
  }
}
