import { Inject } from "@nestjs/common";
import { IRepoRegistry } from "application/abstractions";
import {
  IChatRepo,
  IMessageReactionRepo,
  IMessageRepo,
} from "domain/repositories";
import { ChatRepoModule } from "../repositories/chat-repo";
import { MessageReactionRepoModule } from "../repositories/message-reaction-repo";
import { MessageRepoModule } from "../repositories/message-repo";

export class RepoRegistry implements IRepoRegistry {
  constructor(
    @Inject(ChatRepoModule.REPO) private _chatRepo: IChatRepo,
    @Inject(MessageRepoModule.REPO) private _messageRepo: IMessageRepo,
    @Inject(MessageReactionRepoModule.REPO)
    private _messageReactionRepo: IMessageReactionRepo
  ) {}

  chatRepo(): IChatRepo {
    return this._chatRepo;
  }

  messageRepo(): IMessageRepo {
    return this._messageRepo;
  }

  messageReactionRepo(): IMessageReactionRepo {
    return this._messageReactionRepo;
  }
}
