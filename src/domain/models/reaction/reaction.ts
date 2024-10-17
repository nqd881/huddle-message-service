import { Prop, ValueObjectBase } from "ddd-node";

export interface ReactionProps {
  value: string;
}

export class Reaction extends ValueObjectBase<ReactionProps> {
  @Prop()
  declare value: string;
}
