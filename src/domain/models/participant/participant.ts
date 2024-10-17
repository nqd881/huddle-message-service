import { Id, Prop, ValueObjectBase } from "ddd-node";

export interface ParticipantProps {
  userId: Id;
  chatId: Id;
}

export class Participant<
  P extends ParticipantProps = ParticipantProps
> extends ValueObjectBase<P> {
  @Prop()
  protected declare userId: Id;

  @Prop()
  protected declare chatId: Id;
}
