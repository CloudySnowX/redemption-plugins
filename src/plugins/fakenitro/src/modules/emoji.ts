import { getEmojiOptions } from "../utils/settings";
import { createHyperlink } from "./hyperlink";

// Regular expression to match Discord emoji patterns
const EMOJI_REGEX = /:([a-zA-Z0-9_]+):/g;

export const processEmoji = (message: string): string => {
  try {
    // Quick check to avoid unnecessary processing
    if (!message.includes(':')) return message;
    
    return message.replace(EMOJI_REGEX, (match, emojiName) => {
      try {
        // Find emoji info in Discord's database
        const emojiInfo = findEmojiInfo(emojiName);
        if (!emojiInfo) return match; // Return original text if emoji not found
        
        const options = getEmojiOptions();
        const emojiUrl = buildEmojiUrl(emojiInfo.id, options.size, options.quality);
        
        // Create hyperlink with custom text
        return createHyperlink(emojiUrl, emojiName);
      } catch (emojiError) {
        console.error(`FakeNitro: Error processing emoji ${emojiName}`, emojiError);
        return match; // Fall back to original text on error
      }
    });
  } catch (error) {
    console.error("FakeNitro: Critical error in emoji processing", error);
    return message; // Return unmodified message on critical error
  }
};

// Helper function to find emoji in Discord's database
const findEmojiInfo = (emojiName: string) => {
  // Implementation to search for emoji in Discord's database
  // This is a placeholder - actual implementation will use Discord's internal APIs
  const { getEmoji } = window.vendetta.metro.findByProps("getEmoji");
  return getEmoji(emojiName);
};

// Helper function to build emoji URL
const buildEmojiUrl = (emojiId: string, size: number, quality: string): string => {
  return `https://cdn.discordapp.com/emojis/${emojiId}.${quality}?size=${size}&quality=lossless`;
};
