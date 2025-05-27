import { getHyperlinkOptions } from "../utils/settings";

export const createHyperlink = (emojiUrl: string, emojiName: string): string => {
  const options = getHyperlinkOptions();
  
  if (!options.enabled) {
    return `<${emojiUrl}>`;
  }
  
  const displayText = options.useCustomText 
    ? options.customText 
    : (options.preserveEmojiName ? emojiName : `:${emojiName}:`);
    
  const target = options.openInNewTab ? ' target="_blank"' : '';
  
  return `<a href="${emojiUrl}"${target}>${displayText}</a>`;
};
