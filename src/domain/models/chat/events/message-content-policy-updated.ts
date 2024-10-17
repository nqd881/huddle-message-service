import { Event } from "ddd-node";
import { PolicyUpdated } from "./policy-updated";

@Event("message_content_policy_updated")
export class MessageContentPolicyUpdated extends PolicyUpdated {}
