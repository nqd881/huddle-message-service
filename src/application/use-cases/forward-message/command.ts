import { AppCommand } from "app-command";

export interface ForwardMessageCommandPayload {
  originalChatId: string;
  originalMessageId: string;
  targetChatId: string;
}

export class ForwardMessageCommand extends AppCommand<ForwardMessageCommandPayload> {}
