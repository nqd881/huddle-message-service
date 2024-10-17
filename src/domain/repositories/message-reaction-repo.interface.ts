import { IRepository } from "ddd-node";
import { MessageReaction } from "../models/message-reaction";

export interface IMessageReactionRepo extends IRepository<MessageReaction> {}
