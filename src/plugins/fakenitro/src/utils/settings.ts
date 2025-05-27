import { settings } from "@vendetta/storage";
import { EmojiOptions, HyperlinkOptions } from "../types";

// Initialize settings with defaults if not already set
if (!settings) {
  var settings = {};
}

if (!settings.fakenitro) {
  settings.fakenitro = {
    emoji: {
      size: 48,
      quality: "webp"
    },
    hyperlink: {
      enabled: true,
      customText: "🔗",
      useCustomText: true,
      preserveEmojiName: false,
      openInNewTab: false
    }
  };
}

export const getSettings = () => settings.fakenitro;

export const getEmojiOptions = (): EmojiOptions => getSettings().emoji;

export const getHyperlinkOptions = (): HyperlinkOptions => getSettings().hyperlink;

export const updateSettings = (newSettings: Partial<typeof settings.fakenitro>) => {
  settings.fakenitro = {
    ...settings.fakenitro,
    ...newSettings
  };
};
