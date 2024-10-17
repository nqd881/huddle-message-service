import { Id, Prop } from "ddd-node";
import {
  Message,
  MessageContentLike,
  MessageForwardOrigin,
} from "domain/models/message";
import { Participant, ParticipantProps } from "domain/models/participant";

export interface MessageForwarderProps extends ParticipantProps {
  targetChatId: Id;
  messageId: Id;
  content: MessageContentLike;
}

export class MessageForwarder extends Participant<MessageForwarderProps> {
  @Prop()
  protected declare targetChatId: Id;

  @Prop()
  protected declare messageId: Id;

  @Prop()
  protected declare content: MessageContentLike;

  newForwardMessage(): Message {
    return Message.create({
      chatId: this.targetChatId,
      senderId: this.userId,
      content: this.content,
      sentAt: new Date(),
      editable: false,
      edited: false,
      fwdOrigin: new MessageForwardOrigin({
        chatId: this.chatId,
        messageId: this.messageId,
      }),
    });
  }
}
