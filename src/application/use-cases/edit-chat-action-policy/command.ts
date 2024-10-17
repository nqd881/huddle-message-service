import { AppCommand } from "app-command";

export interface EditChatActionPolicyCommandPayload {
  chatId: string;
  allowedActions?: string[];
  restrictedActions?: string[];
}

export class EditChatActionPolicyCommand extends AppCommand<EditChatActionPolicyCommandPayload> {}
