import { findByProps } from "@vendetta/metro";
import { processEmoji } from "../modules/emoji";

export default {
  name: "MessageProcessor",
  description: "Processes messages to replace emoji codes with custom hyperlinks",
  apply: ( ) => {
    const messageModule = findByProps("sendMessage", "editMessage");
    if (!messageModule) return () => {};
    
    // Store original methods for restoration
    const originalSendMessage = messageModule.sendMessage;
    const originalEditMessage = messageModule.editMessage;
    
    // Patch send message function
    messageModule.sendMessage = function(channelId, message, ...args) {
      if (message.content) {
        // Process emoji in message content
        message.content = processEmoji(message.content);
      }
      
      return originalSendMessage.call(this, channelId, message, ...args);
    };
    
    // Patch edit message function
    messageModule.editMessage = function(channelId, messageId, message, ...args) {
      if (message.content) {
        // Process emoji in edited message content
        message.content = processEmoji(message.content);
      }
      
      return originalEditMessage.call(this, channelId, messageId, message, ...args);
    };
    
    // Return unpatch function
    return () => {
      messageModule.sendMessage = originalSendMessage;
      messageModule.editMessage = originalEditMessage;
    };
  },
  remove: function() {
    // This will be set by the apply function
  }
};
