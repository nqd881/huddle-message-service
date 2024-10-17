import { Chat } from "domain/models";
import { InMemoryRepo } from "../_base";
import { IChatRepo } from "domain/repositories";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InMemoryChatRepo extends InMemoryRepo<Chat> implements IChatRepo {
  chatOfId(chatId: string): Promise<Chat | null> {
    return this.id(chatId);
  }

  async chatsOfIds(chatIds: string[]): Promise<(Chat | null)[]> {
    return chatIds.map(
      (chatId) => this.records.find((record) => record.id() === chatId) ?? null
    );
  }
}
