import React from "react";
import { View, StyleSheet } from "react-native";
import { useProxy } from "@vendetta/storage";
import { getSettings, updateSettings } from "../utils/settings";
import { FormSection, FormRow, FormSwitch, FormInput, FormSelect } from "@vendetta/ui/components";
import { EMOJI_SIZES, EMOJI_QUALITIES } from "../utils/constants";

const Settings = () => {
  const settings = useProxy(getSettings());
  
  // Update settings helper
  const updateSetting = (path: string, value: any) => {
    const newSettings = { ...settings };
    const parts = path.split('.');
    let current = newSettings;
    
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    
    current[parts[parts.length - 1]] = value;
    updateSettings(newSettings);
  };
  
  return (
    <View style={styles.container}>
      {/* Emoji Settings */}
      <FormSection title="Emoji Settings">
        <FormRow
          label="Emoji Size"
          subLabel="Choose the size of the emojis in pixels"
          leading={<FormRow.Icon source={{ uri: "https://cdn.discordapp.com/emojis/1025763617662488646.webp" }} />}
        >
          <FormSelect
            options={EMOJI_SIZES.map(size => ({ label: `${size}px`, value: size } ))}
            value={settings.emoji.size}
            onChange={(value) => updateSetting("emoji.size", value)}
          />
        </FormRow>
        
        <FormRow
          label="Emoji Quality"
          subLabel="Choose between smaller file size or better quality"
          leading={<FormRow.Icon source={{ uri: "https://cdn.discordapp.com/emojis/1025763617662488646.webp" }} />}
        >
          <FormSelect
            options={EMOJI_QUALITIES}
            value={settings.emoji.quality}
            onChange={(value ) => updateSetting("emoji.quality", value)}
          />
        </FormRow>
      </FormSection>
      
      {/* Hyperlink Settings */}
      <FormSection title="Hyperlink Settings">
        <FormRow
          label="Enable Hyperlinks"
          subLabel="Convert emojis to clickable hyperlinks"
        >
          <FormSwitch
            value={settings.hyperlink.enabled}
            onValueChange={(value) => updateSetting("hyperlink.enabled", value)}
          />
        </FormRow>
        
        <FormRow
          label="Use Custom Text"
          subLabel="Replace emoji code with custom text in hyperlinks"
          disabled={!settings.hyperlink.enabled}
        >
          <FormSwitch
            value={settings.hyperlink.useCustomText}
            onValueChange={(value) => updateSetting("hyperlink.useCustomText", value)}
            disabled={!settings.hyperlink.enabled}
          />
        </FormRow>
        
        <FormRow
          label="Custom Text"
          subLabel="Text to display instead of emoji code"
          disabled={!settings.hyperlink.enabled || !settings.hyperlink.useCustomText}
        >
          <FormInput
            value={settings.hyperlink.customText}
            placeholder="🔗"
            onChange={(value) => updateSetting("hyperlink.customText", value)}
            disabled={!settings.hyperlink.enabled || !settings.hyperlink.useCustomText}
          />
        </FormRow>
        
        <FormRow
          label="Preserve Emoji Name"
          subLabel="Show emoji name instead of code when custom text is disabled"
          disabled={!settings.hyperlink.enabled || settings.hyperlink.useCustomText}
        >
          <FormSwitch
            value={settings.hyperlink.preserveEmojiName}
            onValueChange={(value) => updateSetting("hyperlink.preserveEmojiName", value)}
            disabled={!settings.hyperlink.enabled || settings.hyperlink.useCustomText}
          />
        </FormRow>
        
        <FormRow
          label="Open in New Tab"
          subLabel="Open emoji links in a new browser tab"
          disabled={!settings.hyperlink.enabled}
        >
          <FormSwitch
            value={settings.hyperlink.openInNewTab}
            onValueChange={(value) => updateSetting("hyperlink.openInNewTab", value)}
            disabled={!settings.hyperlink.enabled}
          />
        </FormRow>
      </FormSection>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});

export default Settings;
