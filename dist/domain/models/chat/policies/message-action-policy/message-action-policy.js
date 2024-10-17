"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageActionPolicy = void 0;
const ddd_node_1 = require("ddd-node");
const lodash_1 = require("lodash");
let MessageActionPolicy = class MessageActionPolicy extends ddd_node_1.ValueObjectBase {
    constructor(props) {
        super({
            allowedActions: (0, lodash_1.uniq)(props.allowedActions),
            restrictedActions: (0, lodash_1.uniq)(props.restrictedActions),
        });
    }
    isActionAllowed(action) {
        return (this.allowedActions.some((allowedAction) => allowedAction === action) ||
            this.restrictedActions.every((restrictedAction) => restrictedAction !== action));
    }
};
exports.MessageActionPolicy = MessageActionPolicy;
MessageActionPolicy.Validator = (props) => {
    const { allowedActions, restrictedActions } = props;
    const hasConflict = allowedActions.some((actionX) => restrictedActions.includes(actionX));
    if (hasConflict)
        throw new Error("Allowed-actions has conflict with restricted-actions");
};
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", Array)
], MessageActionPolicy.prototype, "allowedActions", void 0);
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", Array)
], MessageActionPolicy.prototype, "restrictedActions", void 0);
exports.MessageActionPolicy = MessageActionPolicy = __decorate([
    (0, ddd_node_1.Model)({
        propsValidator: MessageActionPolicy.Validator,
    }),
    __metadata("design:paramtypes", [Object])
], MessageActionPolicy);
