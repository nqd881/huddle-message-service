import { Id, Prop, StateAggregateBase, StateAggregateBuilder } from "ddd-node";
import { MessageForwardOrigin } from "./message-forward-origin";
import { MessageCreated, MessageEdited } from "./events";
import { MessageContentLike, MessageUpdate } from "./message-content";

export interface MessageProps {
  chatId: Id;
  senderId: Id;
  content: MessageContentLike;
  sentAt: Date;
  editable: boolean;
  edited: boolean;
  editedAt?: Date;
  fwdOrigin?: MessageForwardOrigin;
  replyMessageId?: Id;
}

export class Message extends StateAggregateBase<MessageProps> {
  static create(props: MessageProps) {
    const messageBuilder = new StateAggregateBuilder(Message);

    const message = messageBuilder.withProps(props).build();

    message.recordEvent(MessageCreated, {
      chatId: message.chatId,
      messageId: message.id(),
      senderId: message.senderId,
    });

    return message;
  }

  @Prop()
  private declare chatId: Id;

  @Prop()
  private declare senderId: Id;

  @Prop()
  private declare content: MessageContentLike;

  @Prop()
  private declare editable: boolean;

  get contentType() {
    return this._props.content.type;
  }

  isSentBy(userId: Id) {
    return userId === this._props.senderId;
  }

  edit(update: MessageUpdate) {
    if (!this.editable) throw new Error("This message is uneditable");

    const { messageId, editorId, content } = update;

    if (messageId !== this.id()) throw new Error("Invalid update (messageId)");

    if (this.isSentBy(editorId))
      throw new Error("Just only message sender can edit the message");

    if (content.type !== this.contentType)
      throw new Error("Cannot update message with different type of content");

    this._props.content = content;
    this._props.edited = true;
    this._props.editedAt = new Date();

    this.recordEvent(MessageEdited, {
      chatId: this.chatId,
      messageId: this.id(),
    });
  }

  getContent() {
    return this._props.content.clone();
  }
}
