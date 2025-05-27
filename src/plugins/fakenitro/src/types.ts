export interface EmojiOptions {
  size: number;
  quality: "lossless" | "webp";
}

export interface HyperlinkOptions {
  enabled: boolean;
  customText: string;
  useCustomText: boolean;
  preserveEmojiName: boolean;
  openInNewTab: boolean;
}

export interface Settings {
  emoji: EmojiOptions;
  hyperlink: HyperlinkOptions;
}
