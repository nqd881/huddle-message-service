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
exports.MessageContentVideo = void 0;
const ddd_node_1 = require("ddd-node");
const message_content_1 = require("../message-content");
const message_content_type_1 = require("../message-content-type");
let MessageContentVideo = class MessageContentVideo extends message_content_1.MessageContent {
};
exports.MessageContentVideo = MessageContentVideo;
MessageContentVideo.Validator = (props) => {
    if (props.type !== message_content_type_1.MessageContentType.Video)
        throw new Error("Invalid content type");
};
__decorate([
    (0, ddd_node_1.Prop)(),
    __metadata("design:type", String)
], MessageContentVideo.prototype, "videoId", void 0);
exports.MessageContentVideo = MessageContentVideo = __decorate([
    (0, ddd_node_1.Model)({
        propsValidator: MessageContentVideo.Validator,
    })
], MessageContentVideo);
