import { IRepository, Id } from "ddd-node";
import { Message } from "../models/message";

export interface IMessageRepo extends IRepository<Message> {
  messageOfChat(chatId: Id, messageId: Id): Promise<Message | null>;
}
