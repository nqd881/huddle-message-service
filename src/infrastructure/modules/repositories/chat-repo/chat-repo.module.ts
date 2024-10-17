import { Module } from "@nestjs/common";
import { InMemoryChatRepo } from "./in-memory-chat-repo";

@Module({
  providers: [
    {
      provide: ChatRepoModule.REPO,
      useClass: InMemoryChatRepo,
    },
  ],
  exports: [ChatRepoModule.REPO],
})
export class ChatRepoModule {
  static readonly REPO = Symbol.for("CHAT_REPO");
}
