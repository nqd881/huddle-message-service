import { AppCommand } from "app-command";

export interface EditMessageCommandPayload {
  chatId: string;
  messageId: string;
  contentText: string;
}

export class EditMessageCommand extends AppCommand<EditMessageCommandPayload> {}
