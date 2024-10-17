import { AppCommand } from "app-command";

export interface EditMessageReactionPolicyCommandPayload {
  chatId: string;
  allowedReactions?: string[];
  restrictedReactions?: string[];
}

export class EditMessageReactionPolicyCommand extends AppCommand<EditMessageReactionPolicyCommandPayload> {}
