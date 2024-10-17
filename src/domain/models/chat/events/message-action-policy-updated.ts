import { Event } from "ddd-node";
import { PolicyUpdated } from "./policy-updated";

@Event("message_action_policy_updated")
export class MessageActionPolicyUpdated extends PolicyUpdated {}
