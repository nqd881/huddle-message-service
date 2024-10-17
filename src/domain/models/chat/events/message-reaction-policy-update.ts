import { Event } from "ddd-node";
import { PolicyUpdated } from "./policy-updated";

@Event("message_reaction_policy_updated")
export class MessageReactionPolicyUpdated extends PolicyUpdated {}
