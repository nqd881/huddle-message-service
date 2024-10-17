import { Injectable } from "@nestjs/common";
import { IPermissionService } from "domain/services";

@Injectable()
export class PermissionDomainService implements IPermissionService {
  constructor() {}

  async canUserEditChatActionPolicy(
    userId: string,
    chatId: string
  ): Promise<boolean> {
    return true;
  }

  async canUserEditMessageActionPolicy(
    userId: string,
    chatId: string
  ): Promise<boolean> {
    return true;
  }

  async canUserEditMessageContentPolicy(
    userId: string,
    chatId: string
  ): Promise<boolean> {
    return true;
  }

  async canUserEditMessageReactionPolicy(
    userId: string,
    chatId: string
  ): Promise<boolean> {
    return true;
  }

  async canUserEditOwnMessage(
    userId: string,
    chatId: string
  ): Promise<boolean> {
    return true;
  }

  async canUserForwardMessage(
    userId: string,
    originalChatId: string,
    targetChatId: string
  ): Promise<boolean> {
    return true;
  }

  async canUserReactMessage(userId: string, chatId: string): Promise<boolean> {
    return true;
  }

  async canUserSendMessage(userId: string, chatId: string): Promise<boolean> {
    return true;
  }
}
