import { Id, Prop } from "ddd-node";
import { MessageReaction } from "domain/models/message-reaction";
import { Participant, ParticipantProps } from "domain/models/participant";
import { Reaction } from "domain/models/reaction";

export interface MessageReacterProps extends ParticipantProps {
  reaction: Reaction;
}

export class MessageReacter extends Participant<MessageReacterProps> {
  @Prop()
  protected declare reaction: Reaction;

  newMessageReaction(messageId: Id) {
    return MessageReaction.create({
      chatId: this.chatId,
      senderId: this.userId,
      messageId,
      reaction: this.reaction,
    });
  }
}
