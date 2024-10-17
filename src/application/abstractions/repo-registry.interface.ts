import {
  IChatRepo,
  IMessageReactionRepo,
  IMessageRepo,
} from "../../domain/repositories";

export interface IRepoRegistry {
  chatRepo(): IChatRepo;
  messageRepo(): IMessageRepo;
  messageReactionRepo(): IMessageReactionRepo;
}
