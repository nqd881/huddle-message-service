import { MessageReaction } from "domain/models";
import { InMemoryRepo } from "../_base";
import { IMessageReactionRepo } from "domain/repositories";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InMemoryMessageReactionRepo
  extends InMemoryRepo<MessageReaction>
  implements IMessageReactionRepo {}
