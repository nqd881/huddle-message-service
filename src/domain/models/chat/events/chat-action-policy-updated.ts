import { Event } from "ddd-node";
import { PolicyUpdated } from "./policy-updated";

@Event("chat_action_policy_updated")
export class ChatActionPolicyUpdated extends PolicyUpdated {}
