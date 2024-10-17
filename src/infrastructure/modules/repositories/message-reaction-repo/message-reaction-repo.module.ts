import { Module } from "@nestjs/common";
import { InMemoryMessageReactionRepo } from "./in-memory-message-reaction-repo";

@Module({
  providers: [
    {
      provide: MessageReactionRepoModule.REPO,
      useClass: InMemoryMessageReactionRepo,
    },
  ],
  exports: [MessageReactionRepoModule.REPO],
})
export class MessageReactionRepoModule {
  static readonly REPO = Symbol.for("MESSAGE_REACTION_REPO");
}
