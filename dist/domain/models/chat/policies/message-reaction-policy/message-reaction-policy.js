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
exports.MessageReactionPolicy = void 0;
const ddd_node_1 = require("ddd-node");
const value_object_utils_1 = require("../../../../utils/value-object.utils");
let MessageReactionPolicy = class MessageReactionPolicy extends ddd_node_1.ValueObjectBase {
    constructor(props) {
        super({
            allowedReactions: (0, value_object_utils_1.getUniqueValueObjects)(props.allowedReactions),
            restrictedReactions: (0, value_object_utils_1.getUniqueValueObjects)(props.restrictedReactions),
        });
    }
    isReactionAllowed(reaction) {
        return (this.allowedReactions.some((reactionX) => reactionX.equals(reaction)) ||
            this.restrictedReactions.every((reactionY) => !reactionY.equals(reaction)));
    }
};
exports.MessageReactionPolicy = MessageReactionPolicy;
MessageReactionPolicy.Validator = (props) => {
    const { allowedReactions, restrictedReactions } = props;
    const hasConflict = allowedReactions.some((reactionX) => restrictedReactions.some((reactionY) => reactionY.equals(reactionX)));
    if (hasConflict)
        throw new Error("Allowed reactions has conflict with restricted reactions");
};
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", Array)
], MessageReactionPolicy.prototype, "allowedReactions", void 0);
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", Array)
], MessageReactionPolicy.prototype, "restrictedReactions", void 0);
exports.MessageReactionPolicy = MessageReactionPolicy = __decorate([
    (0, ddd_node_1.Model)({
        propsValidator: MessageReactionPolicy.Validator,
    }),
    __metadata("design:paramtypes", [Object])
], MessageReactionPolicy);
