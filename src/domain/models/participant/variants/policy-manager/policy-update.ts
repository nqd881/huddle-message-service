import { Id, Prop, ValueObjectBase } from "ddd-node";
import { ChatPolicyLike } from "../../../chat";

export interface PolicyUpdateProps<T extends ChatPolicyLike> {
  chatId: Id;
  updaterId: Id;
  policy: T;
}

export class PolicyUpdate<T extends ChatPolicyLike> extends ValueObjectBase<
  PolicyUpdateProps<T>
> {
  @Prop()
  declare chatId: Id;

  @Prop()
  declare updaterId: Id;

  @Prop()
  declare policy: T;
}
