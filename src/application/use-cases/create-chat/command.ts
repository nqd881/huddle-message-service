import { AppCommand } from "app-command";

export interface PolicyPayload<T> {
  allowed?: T[];
  restricted?: T[];
}

export interface CreateChatCommandPayload {
  chatId: string;
  chatActionPolicy?: PolicyPayload<string>;
  messageActionPolicy?: PolicyPayload<string>;
  messageContentPolicy?: PolicyPayload<string>;
  messageReactionPolicy?: PolicyPayload<string>;
}

export class CreateChatCommand extends AppCommand<CreateChatCommandPayload> {}
