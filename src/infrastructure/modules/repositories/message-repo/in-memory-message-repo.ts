import { Message } from "domain/models";
import { InMemoryRepo } from "../_base";
import { IMessageRepo } from "domain/repositories";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InMemoryMessageRepo
  extends InMemoryRepo<Message>
  implements IMessageRepo
{
  async messageOfChat(
    chatId: string,
    messageId: string
  ): Promise<Message | null> {
    return (
      this.records.find((record) => {
        const props = record.props();

        return props.chatId === chatId && record.id() === messageId;
      }) ?? null
    );
  }
}
