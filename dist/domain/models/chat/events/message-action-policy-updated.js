"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageActionPolicyUpdated = void 0;
const ddd_node_1 = require("ddd-node");
const policy_updated_1 = require("./policy-updated");
let MessageActionPolicyUpdated = class MessageActionPolicyUpdated extends policy_updated_1.PolicyUpdated {
};
exports.MessageActionPolicyUpdated = MessageActionPolicyUpdated;
exports.MessageActionPolicyUpdated = MessageActionPolicyUpdated = __decorate([
    (0, ddd_node_1.Event)("message_action_policy_updated")
], MessageActionPolicyUpdated);
