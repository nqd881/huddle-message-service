"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyManager = void 0;
const __1 = require("../..");
const policy_update_1 = require("./policy-update");
class PolicyManager extends __1.Participant {
    newUpdate(policy) {
        return new policy_update_1.PolicyUpdate({
            chatId: this.chatId,
            updaterId: this.userId,
            policy,
        });
    }
}
exports.PolicyManager = PolicyManager;
