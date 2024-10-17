import { Module } from "@nestjs/common";
import { ChatRepoModule } from "../repositories/chat-repo";
import { MessageReactionRepoModule } from "../repositories/message-reaction-repo";
import { MessageRepoModule } from "../repositories/message-repo";
import { RepoRegistry } from "./repo-registry";

@Module({
  imports: [ChatRepoModule, MessageRepoModule, MessageReactionRepoModule],
  providers: [
    {
      provide: RepoRegistryModule.REGISTRY,
      useClass: RepoRegistry,
    },
  ],
  exports: [
    RepoRegistryModule.REGISTRY,
    // re-export repo modules
    ChatRepoModule,
    MessageRepoModule,
    MessageReactionRepoModule,
  ],
})
export class RepoRegistryModule {
  static readonly REGISTRY = Symbol.for("REPO_REGISTRY");
}
