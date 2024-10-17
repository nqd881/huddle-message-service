import { ChatPolicyLike } from "../../../chat";
import { Participant } from "../..";
import { PolicyUpdate } from "./policy-update";

export class PolicyManager<T extends ChatPolicyLike> extends Participant {
  newUpdate(policy: T): PolicyUpdate<T> {
    return new PolicyUpdate<T>({
      chatId: this.chatId,
      updaterId: this.userId,
      policy,
    });
  }
}
