import { Id } from "ddd-node";
import { MessageContentLike, MessageUpdate } from "domain/models/message";
import { Participant } from "domain/models/participant";

export class MessageEditor extends Participant {
  newUpdate(messageId: Id, content: MessageContentLike): MessageUpdate {
    return new MessageUpdate({
      messageId,
      content,
      editorId: this.userId,
    });
  }
}
