import { AppCommand } from "app-command";

export interface SendMessageCommandPayload {
  chatId: string;
  replyMessageId?: string;
  contentText: string;
}

export class SendMessageCommand extends AppCommand<SendMessageCommandPayload> {}
