"use strict";
// import { Enum, EnumBase } from "ddd-node";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageContentType = void 0;
// export class MessageContentType extends EnumBase {
//   @Enum("text")
//   static Text: MessageContentType;
//   @Enum("video")
//   static Video: MessageContentType;
//   @Enum("photo")
//   static Photo: MessageContentType;
//   @Enum("file")
//   static File: MessageContentType;
//   @Enum("voice")
//   static Voice: MessageContentType;
//   @Enum("sticker")
//   static Sticker: MessageContentType;
//   @Enum("poll")
//   static Poll: MessageContentType;
//   @Enum("video_call")
//   static VideoCall: MessageContentType;
//   @Enum("contact")
//   static Contact: MessageContentType;
//   @Enum("notification")
//   static Notification: MessageContentType;
// }
var MessageContentType;
(function (MessageContentType) {
    MessageContentType["Text"] = "text";
    MessageContentType["Video"] = "video";
    MessageContentType["Photo"] = "photo";
    MessageContentType["File"] = "file";
    MessageContentType["Voice"] = "voice";
    MessageContentType["Sticker"] = "sticker";
    MessageContentType["Poll"] = "poll";
    MessageContentType["VideoCall"] = "video_call";
    MessageContentType["Contact"] = "contact";
    MessageContentType["Notification"] = "notification";
})(MessageContentType || (exports.MessageContentType = MessageContentType = {}));
