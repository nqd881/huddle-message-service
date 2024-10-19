import {
  Id,
  Model,
  Prop,
  PropsValidator,
  StateAggregateBase,
  StateAggregateBuilder,
} from "ddd-node";
import { MessageForwardOrigin } from "./message-forward-origin";
import { MessageCreated, MessageEdited } from "./events";
import { MessageContentLike, MessageUpdate } from "./message-content";
import { MessageEdition } from "./message-edition";

export interface MessageProps {
  chatId: Id;
  senderId: Id;
  content: MessageContentLike;
  sentAt: Date;
  editable: boolean;
  editions: MessageEdition[];
  fwdOrigin?: MessageForwardOrigin;
  replyMessageId?: Id;
}

@Model({
  propsValidator: Message.Validator,
})
export class Message extends StateAggregateBase<MessageProps> {
  static Validator: PropsValidator<Message> = (props) => {};

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

  @Prop()
  private declare editions: MessageEdition[];

  get contentType() {
    return this._props.content.type;
  }

  get currentContent() {
    if (!this.isEdited()) return this.content;

    return this.editions.at(-1)!.content;
  }

  isSentBy(userId: Id) {
    return userId === this._props.senderId;
  }

  isEdited() {
    return this.editions.length > 0;
  }

  edit(update: MessageUpdate) {
    if (!this.editable) throw new Error("This message is uneditable");

    const { messageId, editorId, content } = update;

    if (messageId !== this.id()) throw new Error(`Invalid update ${messageId}`);

    if (this.isSentBy(editorId))
      throw new Error("Just only message sender can edit the message");

    if (content.type !== this.contentType)
      throw new Error("Cannot update message with different type of content");

    const edition = new MessageEdition({
      content,
      editedAt: new Date(),
    });

    this._props.editions.push(edition);

    this.recordEvent(MessageEdited, {
      chatId: this.chatId,
      messageId: this.id(),
    });
  }

  getContent() {
    return this.currentContent.clone();
  }
}
