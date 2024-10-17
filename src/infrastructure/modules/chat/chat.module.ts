import { Module } from "@nestjs/common";
import { AppCoreModule } from "../app-core";
import { ChatController } from "./chat.controller";

@Module({
  imports: [AppCoreModule],
  controllers: [ChatController],
})
export class ChatModule {}
