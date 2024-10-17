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
exports.MessageContentPolicy = void 0;
const ddd_node_1 = require("ddd-node");
const lodash_1 = require("lodash");
let MessageContentPolicy = class MessageContentPolicy extends ddd_node_1.ValueObjectBase {
    constructor(props) {
        super({
            allowedTypes: (0, lodash_1.uniq)(props.allowedTypes),
            restrictedTypes: (0, lodash_1.uniq)(props.restrictedTypes),
        });
    }
    isContentTypeAllowed(contentType) {
        return (this.allowedTypes.some((allowedType) => allowedType === contentType) ||
            this.restrictedTypes.every((restrictedType) => restrictedType !== contentType));
    }
};
exports.MessageContentPolicy = MessageContentPolicy;
MessageContentPolicy.Validator = (props) => {
    const { allowedTypes, restrictedTypes } = props;
    const hasConflict = allowedTypes.some((typeX) => restrictedTypes.includes(typeX));
    if (hasConflict)
        throw new Error("Allowed types has conflict with restricted types");
};
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", Array)
], MessageContentPolicy.prototype, "allowedTypes", void 0);
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", Array)
], MessageContentPolicy.prototype, "restrictedTypes", void 0);
exports.MessageContentPolicy = MessageContentPolicy = __decorate([
    (0, ddd_node_1.Model)({
        propsValidator: MessageContentPolicy.Validator,
    }),
    __metadata("design:paramtypes", [Object])
], MessageContentPolicy);
