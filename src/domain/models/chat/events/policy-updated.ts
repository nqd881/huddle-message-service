import { EventBase, Id } from "ddd-node";

export interface PolicyUpdatedProps {
  chatId: Id;
  updaterId: Id;
}

export abstract class PolicyUpdated extends EventBase<PolicyUpdatedProps> {}
