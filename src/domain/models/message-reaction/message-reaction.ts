import { Id, Prop, StateAggregateBase, StateAggregateBuilder } from "ddd-node";
import { Reaction } from "../reaction";
import { MessageReacted } from "./events";

export interface MessageReactionProps {
  chatId: Id;
  messageId: Id;
  senderId: Id;
  reaction: Reaction;
}

export class MessageReaction extends StateAggregateBase<MessageReactionProps> {
  static create(props: MessageReactionProps) {
    const builder = new StateAggregateBuilder(MessageReaction);

    const messageReaction = builder.withProps(props).build();

    messageReaction.recordEvent(MessageReacted, {
      messageReactionId: messageReaction.id(),
      chatId: messageReaction.chatId,
      messageId: messageReaction.messageId,
      senderId: messageReaction.senderId,
      reactionValue: messageReaction.reaction.value,
    });

    return messageReaction;
  }

  @Prop()
  private declare chatId: Id;

  @Prop()
  private declare messageId: Id;

  @Prop()
  private declare senderId: Id;

  @Prop()
  private declare reaction: Reaction;
}
