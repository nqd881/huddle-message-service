import { AppCommand } from "app-command";

export interface EditMessageContentPolicyCommandPayload {
  chatId: string;
  allowedContentTypes?: string[];
  restrictedContentTypes?: string[];
}

export class EditMessageContentPolicyCommand extends AppCommand<EditMessageContentPolicyCommandPayload> {}
