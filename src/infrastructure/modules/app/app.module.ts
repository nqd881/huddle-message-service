import { Module } from "@nestjs/common";
import { AppCoreModule } from "../app-core";
import { ChatModule } from "../chat";

@Module({
  imports: [AppCoreModule, ChatModule],
})
export class AppModule {}
