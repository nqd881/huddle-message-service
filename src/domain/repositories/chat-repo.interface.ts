import { IRepository, Id } from "ddd-node";
import { Chat } from "../models/chat";

export interface IChatRepo extends IRepository<Chat> {
  chatOfId(chatId: Id): Promise<Chat | null>;
  chatsOfIds(chatIds: Id[]): Promise<(Chat | null)[]>;
}
