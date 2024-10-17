import { AppCommand } from "app-command";

export interface ReactMessageCommandPayload {
  chatId: string;
  messageId: string;
  reaction: string;
}

export class ReactMessageCommand extends AppCommand<ReactMessageCommandPayload> {}
