import { Model, Prop, PropsValidator, ValueObjectBase } from "ddd-node";
import { Reaction } from "../../../reaction";
import { getUniqueValueObjects } from "../../../../utils/value-object.utils";

export interface MessageReactionPolicyProps {
  allowedReactions: Reaction[];
  restrictedReactions: Reaction[];
}

@Model({
  propsValidator: MessageReactionPolicy.Validator,
})
export class MessageReactionPolicy extends ValueObjectBase<MessageReactionPolicyProps> {
  static Validator: PropsValidator<MessageReactionPolicy> = (props) => {
    const { allowedReactions, restrictedReactions } = props;

    const hasConflict = allowedReactions.some((reactionX) =>
      restrictedReactions.some((reactionY) => reactionY.equals(reactionX))
    );

    if (hasConflict)
      throw new Error(
        "Allowed reactions has conflict with restricted reactions"
      );
  };

  constructor(props: MessageReactionPolicyProps) {
    super({
      allowedReactions: getUniqueValueObjects(props.allowedReactions),
      restrictedReactions: getUniqueValueObjects(props.restrictedReactions),
    });
  }

  @Prop()
  private declare allowedReactions: Reaction[];

  @Prop()
  private declare restrictedReactions: Reaction[];

  isReactionAllowed(reaction: Reaction) {
    return (
      this.allowedReactions.some((reactionX) => reactionX.equals(reaction)) ||
      this.restrictedReactions.every((reactionY) => !reactionY.equals(reaction))
    );
  }
}
