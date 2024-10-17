import { Module } from "@nestjs/common";
import { InMemoryMessageRepo } from "./in-memory-message-repo";

@Module({
  providers: [
    {
      provide: MessageRepoModule.REPO,
      useClass: InMemoryMessageRepo,
    },
  ],
  exports: [MessageRepoModule.REPO],
})
export class MessageRepoModule {
  static readonly REPO = Symbol.for("MESSAGE_REPO");
}
