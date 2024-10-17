import {
  MessageContentFile,
  MessageContentPhoto,
  MessageContentText,
  MessageContentVideo,
} from "./variants";

export type MessageContentLike =
  | MessageContentText
  | MessageContentPhoto
  | MessageContentVideo
  | MessageContentFile;
