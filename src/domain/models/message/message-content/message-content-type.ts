// import { Enum, EnumBase } from "ddd-node";

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

export enum MessageContentType {
  Text = "text",
  Video = "video",
  Photo = "photo",
  File = "file",
  Voice = "voice",
  Sticker = "sticker",
  Poll = "poll",
  VideoCall = "video_call",
  Contact = "contact",
  Notification = "notification",
}
