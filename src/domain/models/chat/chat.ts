import { Id, Prop, StateAggregateBase, StateAggregateBuilder } from "ddd-node";
import { MessageActionPolicy } from "./policies/message-action-policy";
import { MessageAction } from "../message-action";
import { MessageContentType } from "../message/message-content";
import { MessageContentPolicy } from "./policies/message-content-policy";
import { Reaction } from "../reaction";
import { MessageReactionPolicy } from "./policies/message-reaction-policy";
import { ChatActionPolicy } from "./policies/chat-action-policy";
import { ChatAction } from "../chat-action";
import {
  ChatActionPolicyUpdated,
  ChatCreated,
  MessageActionPolicyUpdated,
  MessageContentPolicyUpdated,
  MessageReactionPolicyUpdated,
} from "./events";
import { PolicyUpdate } from "../participant/variants/policy-manager";
import { ChatPolicyLike } from "./policies";

export interface ChatProps {
  chatActionPolicy: ChatActionPolicy;
  messageActionPolicy: MessageActionPolicy;
  messageContentPolicy: MessageContentPolicy;
  messageReactionPolicy: MessageReactionPolicy;
}

export class Chat extends StateAggregateBase<ChatProps> {
  static create(id: Id, props: ChatProps) {
    const builder = new StateAggregateBuilder(Chat);

    const chat = builder.withId(id).withProps(props).build();

    chat.recordEvent(ChatCreated, {
      chatId: id,
    });

    return chat;
  }

  @Prop()
  private declare chatActionPolicy: ChatActionPolicy;

  @Prop()
  private declare messageActionPolicy: MessageActionPolicy;

  @Prop()
  private declare messageContentPolicy: MessageContentPolicy;

  @Prop()
  private declare messageReactionPolicy: MessageReactionPolicy;

  canPerformMessageAction(action: MessageAction) {
    return this.messageActionPolicy.isActionAllowed(action);
  }

  ensureCanPerformMessageAction(action: MessageAction) {
    if (!this.canPerformMessageAction(action))
      throw new Error(`Message action "${action}" is not allowed in this chat`);
  }

  canSendContentType(contentType: MessageContentType) {
    return this.messageContentPolicy.isContentTypeAllowed(contentType);
  }

  ensureCanSendContentType(contentType: MessageContentType) {
    if (!this.canSendContentType(contentType))
      throw new Error(
        `Message content type "${contentType}" is not allowed in this chat`
      );
  }

  canUseReaction(reaction: Reaction) {
    return this.messageReactionPolicy.isReactionAllowed(reaction);
  }

  ensureCanUseReaction(reaction: Reaction) {
    if (!this.canUseReaction(reaction))
      throw new Error(
        `Reaction "${reaction.value}" is not allowed in this chat`
      );
  }

  canPerformChatAction(action: ChatAction) {
    return this.chatActionPolicy.isActionAllowed(action);
  }

  ensureCanPerformChatAction(action: ChatAction) {
    if (!this.canPerformChatAction(action))
      throw new Error(`Chat action "${action}" is not allowed in this chat`);
  }

  private ensurePolicyUpdateIsValid<T extends ChatPolicyLike>(
    update: PolicyUpdate<T>
  ) {
    if (update.chatId !== this.id()) throw new Error("Invalid policy update");
  }

  updateChatActionPolicy(update: PolicyUpdate<ChatActionPolicy>) {
    this.ensurePolicyUpdateIsValid(update);

    const { chatId, updaterId, policy } = update;

    this._props.chatActionPolicy = policy;

    this.recordEvent(ChatActionPolicyUpdated, {
      chatId,
      updaterId,
    });
  }

  updateMessageActionPolicy(update: PolicyUpdate<MessageActionPolicy>) {
    this.ensurePolicyUpdateIsValid(update);

    const { chatId, updaterId, policy } = update;

    this._props.messageActionPolicy = policy;

    this.recordEvent(MessageActionPolicyUpdated, {
      chatId,
      updaterId,
    });
  }

  updateMessageContentPolicy(update: PolicyUpdate<MessageContentPolicy>) {
    this.ensurePolicyUpdateIsValid(update);

    const { chatId, updaterId, policy } = update;

    this._props.messageContentPolicy = policy;

    this.recordEvent(MessageContentPolicyUpdated, {
      chatId,
      updaterId,
    });
  }

  updateMessageReactionPolicy(update: PolicyUpdate<MessageReactionPolicy>) {
    this.ensurePolicyUpdateIsValid(update);

    const { chatId, updaterId, policy } = update;

    this._props.messageReactionPolicy = policy;

    this.recordEvent(MessageReactionPolicyUpdated, {
      chatId,
      updaterId,
    });
  }
}
