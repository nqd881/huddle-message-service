import { Controller, Inject, Param, Post } from "@nestjs/common";
import { App } from "application/app";
import { AppCommandBusClient } from "app-command";
import { CreateChatCommand } from "application/use-cases/create-chat";
import { SendMessageCommand } from "application/use-cases/send-message";
import { v4 } from "uuid";
import { AppCoreModule } from "../app-core";

@Controller("chats")
export class ChatController {
  constructor(@Inject(AppCoreModule.APP_CORE) private appCore: App) {}

  private randomClient() {
    return new AppCommandBusClient(v4());
  }

  @Post()
  async newChat() {
    const client = this.randomClient();

    const command = client.newCommand(CreateChatCommand, {
      chatId: v4(),
    });

    console.log("Command", command);

    try {
      const result = await this.appCore.executeCommand(command);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  @Post(":chat_id/messages")
  async sendMessage(@Param("chat_id") chatId: string) {
    const client = this.randomClient();

    const command = client.newCommand(SendMessageCommand, {
      chatId,
      contentText: "Hello baby",
    });

    const result = await this.appCore.executeCommand(command);

    console.log(result);
  }
}
