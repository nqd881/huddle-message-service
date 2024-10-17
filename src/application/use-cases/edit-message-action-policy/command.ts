import { AppCommand } from "app-command";

export interface EditMessageActionPolicyCommandPayload {
  chatId: string;
  allowedActions?: string[];
  restrictedActions?: string[];
}

export class EditMessageActionPolicyCommand extends AppCommand<EditMessageActionPolicyCommandPayload> {}
