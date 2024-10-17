import { Id, Prop } from "ddd-node";
import { Message, MessageContentLike } from "domain/models/message";
import { Participant, ParticipantProps } from "domain/models/participant";

export interface MessageSenderProps extends ParticipantProps {
  content: MessageContentLike;
}

export class MessageSender extends Participant<MessageSenderProps> {
  @Prop()
  protected content: MessageContentLike;

  newMessage(replyMessageId?: Id) {
    const message = Message.create({
      chatId: this.chatId,
      senderId: this.userId,
      content: this.content,
      sentAt: new Date(),
      editable: true,
      edited: false,
      replyMessageId,
    });

    return message;
  }
}
